import { ReactNode } from "react";
import Menu from "./Menu";

interface Props {
  children?: ReactNode;
}

function Main({ children }: Props) {
  return (
    <main>
      <div className="container">
        <div className="columns">
          <div className="column is-one-quarter">
            <Menu />
          </div>
          <div className="column">{children}</div>
        </div>
      </div>
    </main>
  );
}

export default Main;
