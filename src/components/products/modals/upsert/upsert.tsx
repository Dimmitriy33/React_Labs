/* eslint-disable react/require-default-props */
/* eslint-disable no-shadow */
import "./upsert.scss";
import { useEffect, useState } from "react";
import {
  AgeRatings,
  Genres,
  MaxFieldLength,
  MaxRating,
  MinFieldLength,
  MinRating,
  Platforms,
} from "@/constants/inputValidation";
import validator from "validator";
import Swal from "sweetalert2";
import { createGame, updateGame } from "@/api/apiProducts";
import useTypedSelector from "@/redux/customHooks/typedSelector";
import IGame, { ICreateGame, IUpdateGame } from "@/redux/types/productState";

export const enum UpsertOperation {
  update,
  create,
}

interface UpsertProps {
  closeCallback: () => void;
  updateProducts: () => Promise<void>;
  operation: UpsertOperation;
  game?: IGame;
}

export default function Upsert(props: UpsertProps): JSX.Element {
  const [name, setName] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [logo, setLogo] = useState<File | null>();
  const [background, setBackground] = useState<File | null>();
  const [price, setPrice] = useState<string>("");
  const [count, setCount] = useState<string>("");

  const token = useTypedSelector((state) => state.userReducer.token);

  useEffect(() => {
    if (props.game !== undefined) {
      setName(props.game.name);
      setPlatform(props.game.platform);
      setGenre(props.game.genre);
      setRating(props.game.totalRating.toString());
      setAge(props.game.rating.toString());
      setPrice(props.game.price.toString());
      setCount(props.game.count.toString());
    }
  }, []);

  const onSubmit = async () => {
    if (props.operation === UpsertOperation.create) {
      const result = await createGame(
        {
          name,
          platform,
          totalRating: rating,
          genre,
          age,
          logo,
          background,
          price,
          count,
        } as ICreateGame,
        token
      );

      if (result) {
        Swal.fire({
          title: "Success",
          text: "New product!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Invalid add product attempt!",
          icon: "error",
        });
      }
    } else if (props.operation === UpsertOperation.update) {
      const result = await updateGame(
        {
          id: (props.game as IGame).id,
          name,
          platform,
          totalRating: rating,
          genre,
          age,
          logo,
          background,
          price,
          count,
        } as IUpdateGame,
        token
      );

      if (result) {
        Swal.fire({
          title: "Success",
          text: "Update product!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Invalid update product attempt!",
          icon: "error",
        });
      }
    }

    props.closeCallback();
    props.updateProducts();
    document.body.removeChild<Element>(document.getElementsByClassName("modal-container")[0]);
  };

  return (
    <div className="upsert-container">
      <form onSubmit={onSubmit} className="upsert-container__form">
        {props.operation === UpsertOperation.create ? <h1>Create game</h1> : <h1>Update game</h1>}
        <label htmlFor="name">
          Name :
          <br />
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          {name.length >= MinFieldLength && name.length < MaxFieldLength ? null : (
            <span className="input-error">Invalid Name</span>
          )}
        </label>
        <br />
        <label htmlFor="platform">
          Platform :
          <br />
          <input
            type="text"
            id="platform"
            value={platform}
            onChange={(event) => {
              setPlatform(event.target.value);
            }}
          />
          {Platforms.indexOf(platform) > -1 ? null : <span className="input-error">Invalid Platform</span>}
        </label>
        <br />
        <label htmlFor="genre">
          Genre :
          <br />
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(event) => {
              setGenre(event.target.value);
            }}
          />
          {Genres.indexOf(genre as unknown as string) > -1 ? null : <span className="input-error">Invalid Genre</span>}
        </label>
        <br />
        <label htmlFor="rating">
          Rating :
          <br />
          <input
            type="text"
            id="rating"
            value={rating}
            onChange={(event) => {
              if (event.target.value) {
                setRating(event.target.value);
              }
            }}
          />
          {validator.isNumeric(rating as unknown as string) &&
          (rating as unknown as number) >= MinRating &&
          (rating as unknown as number) <= MaxRating ? null : (
            <span className="input-error">Invalid Rating</span>
          )}
        </label>
        <br />
        <label htmlFor="age">
          Age :
          <br />
          <input
            type="text"
            id="age"
            value={age}
            onChange={(event) => {
              setAge(event.target.value);
            }}
          />
          {AgeRatings.indexOf(age as unknown as string) > -1 ? null : <span className="input-error">Invalid Age</span>}
        </label>
        <br />
        <label htmlFor="price">
          Price :
          <br />
          <input
            type="text"
            id="price"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
          {validator.isNumeric(price as unknown as string) ? null : <span className="input-error">Invalid Price</span>}
        </label>
        <br />
        <label htmlFor="count">
          Count :
          <br />
          <input
            type="text"
            id="count"
            value={count}
            onChange={(event) => {
              setCount(event.target.value);
            }}
          />
          {validator.isNumeric(count as unknown as string) ? null : <span className="input-error">Invalid Count</span>}
        </label>
        <br />
        <label htmlFor="logo">
          Logo :
          <br />
          <input
            type="file"
            id="logo"
            onChange={(event) => {
              setLogo((event.target.files as FileList)[0] && (event.target.files as FileList)[0]);
            }}
          />
        </label>
        <br />

        <label htmlFor="background">
          Background :
          <br />
          <input
            type="file"
            id="background"
            onChange={(event) => {
              setBackground((event.target.files as FileList)[0] && (event.target.files as FileList)[0]);
            }}
          />
        </label>
        <br />

        <button type="button" className="signIn-container__form__button" onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
