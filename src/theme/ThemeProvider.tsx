import React, {useEffect, useState, useContext, createContext, ReactNode} from "react";
import { darkColors, lightColors } from "./Colors";

import { useColorScheme } from "react-native";

interface ThemeContextProps {
    dark: boolean;
    colors: Record<string, string>;
    setScheme: (scheme: string) => void;
  }

const ThemeContext = createContext<ThemeContextProps>({
    dark: false,
    colors: lightColors,
    setScheme: () => {}
})

interface ThemeProviderProps {
    children: ReactNode;
  }


export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
    const colorScheme = useColorScheme();
    const [isDark, setIsDark] = useState<boolean>(colorScheme == 'dark')

    useEffect(() => {
        setIsDark(colorScheme == 'dark')
    }, [colorScheme])

    const defaultTheme = {
        dark: isDark,
        colors: isDark ? darkColors : lightColors,
        setScheme : (scheme: string) => setIsDark(scheme == 'dark')
    }

    return(
        <ThemeContext.Provider value={defaultTheme} >
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme= () => useContext(ThemeContext)