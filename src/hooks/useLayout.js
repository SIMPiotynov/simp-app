import { useContext, createContext, useState } from "react";

const layoutContext = createContext();

export function ProvideLayout({ children }) {
  const layout = useProvideLayout();
  return (
    <layoutContext.Provider value={layout}>{children}</layoutContext.Provider>
  );
}

const useLayout = () => {
  return useContext(layoutContext);
};

export default useLayout;

const defaultState = {
  title: "SIMP",
  activeMenuKeys: [],
};

function useProvideLayout() {
  const [layout, setLayoutData] = useState(defaultState);

  const setLayout = (data) => {
    setLayoutData({
      ...defaultState,
      ...data,
    });
  };

  // Return the user object and layout methods
  return { layout, setLayout };
}
