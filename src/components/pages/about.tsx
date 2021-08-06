import UserContext, { IUser } from "../users/userContext";

function About(): JSX.Element {
  const user = { id: "d", userName: "d", phoneNumber: "d", addressDelivery: "d" } as IUser;

  return (
    // <UserContext.Consumer>
    //   {(userCtx) => {
    //     const onLogin = () => {
    //       userCtx && userCtx.login(user);
    //     };
    //     return (
    //       <div>
    //         <h1>Fanat karambaby</h1>
    //         <button type="button" onClick={onLogin}>
    //           aaa
    //         </button>
    //         <button type="button" onClick={() => console.log(userCtx?.user)}>
    //           aaa
    //         </button>
    //       </div>
    //     );
    //   }}
    // </UserContext.Consumer>
    <div>about</div>
  );
}

export default About;
