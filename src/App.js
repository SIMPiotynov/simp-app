import SideMenu from "./components/menu/SideMenu";
import AppRouter from "./router/Router";

function App() {
  return (
    <div className="w-screen h-screen flex">
      <SideMenu></SideMenu>
      <AppRouter/>
    </div>
  );
}

export default App;
