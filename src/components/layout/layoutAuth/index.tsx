import { Outlet } from "react-router-dom";

export default function LayoutAuth() {
  return (
    <div className="layout-auth">
      <div className="layout-auth__content">
        <Outlet />
      </div>
      <div className="about">
        <h3>Автоматическая комплектация исполнительной документации</h3>
      </div>
    </div>
  );
}
