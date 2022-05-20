/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line no-use-before-define
import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Popconfirm, Form } from "antd";
import { FormInstance } from "antd/lib/form";
import "./basket.scss";
import "antd/dist/antd.css";
import { IOrder } from "@/redux/types/orderState";
import { connect } from "react-redux";
import { addGameToCartAsync, removeAllGamesFromCartAsync, removeGameFromCartAsync } from "@/redux/actions/orderActions";
import { state } from "@/redux/reducers";
import makeAnOrder from "@/api/apiOrder";
import Swal from "sweetalert2";

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface EditableRowProps {
  index: number;
}

const mapStateToProps = (localState: state) => ({
  orders: localState.orderReducer.orders,
  token: localState.userReducer.token,
});

const mapDispatchToProps = {
  addGameToCartAsync,
  removeGameFromCartAsync,
  removeAllGamesFromCartAsync,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof IOrder;
  record: IOrder;
  handleSave: (record: IOrder) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<Input>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit} role="dialog">
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

interface StateProps {
  orders: IOrder[];
  token: string;
}

interface DispatchProps {
  addGameToCartAsync: (game: IOrder | undefined) => void;
  removeGameFromCartAsync: (game: IOrder | undefined) => void;
  removeAllGamesFromCartAsync: () => void;
}

type EditableTableProps = Parameters<typeof Table>[0];

interface EditableTableState {
  dataSource: IOrder[];
  count: number;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

class EditableTable extends React.Component<EditableTableProps & StateProps & DispatchProps, EditableTableState> {
  columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[];

  constructor(props: EditableTableState & StateProps & DispatchProps) {
    super(props);

    this.columns = [
      {
        title: "Name",
        dataIndex: "name",
        width: "30%",
        editable: false,
      },
      {
        title: "Amount",
        dataIndex: "amount",
      },
      {
        title: "Address",
        dataIndex: "address",
      },
      {
        title: "Date",
        dataIndex: "date",
      },
      {
        title: "Price",
        dataIndex: "price",
      },
      {
        title: "Operation",
        dataIndex: "operation",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        render: (_, record: { key: React.Key }) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      dataSource: this.props.orders,
      count: 0,
    };
  }

  handleDelete = async (key: React.Key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter((item) => item.key !== key) });
    await this.props.removeGameFromCartAsync(dataSource.find((item) => item.key === key));
  };

  submitOrder = async () => {
    const dataSource = [...this.state.dataSource];
    if (dataSource.length > 0) {
      const result = await makeAnOrder(dataSource, this.props.token);
      if (result) {
        this.setState({ dataSource: [] });
        await this.props.removeAllGamesFromCartAsync();
        Swal.fire({
          title: "Good job!",
          text: "Thank you for your order!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Invalid buy attempt!",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "Pls select products to make an order!",
        icon: "error",
      });
    }
  };

  handleAdd = (item: IOrder) => {
    const { count, dataSource } = this.state;
    this.setState({
      dataSource: [...dataSource, item],
      count: count + 1,
    });
  };

  handleSave = (row: IOrder) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: IOrder) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div className="basketTable">
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns as ColumnTypes}
        />
        <button className="button-submit" type="button" onClick={this.submitOrder}>
          Buy
        </button>
      </div>
    );
  }
}

export function Basket(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <EditableTable />;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(EditableTable);
