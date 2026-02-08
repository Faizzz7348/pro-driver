"use client"

import { useEffect } from "react"

// Theme colors for PWA
const THEME_COLORS = {
  light: "#00a650", // Green for light mode
  dark: "#0d0d0d",  // Dark for dark mode
}

export function ThemeMetaManager() {
  useEffect(() => {
    const updateThemeColor = () => {
      const isDark = document.documentElement.classList.contains("dark")
      const color = isDark ? THEME_COLORS.dark : THEME_COLORS.light
      
      // Update meta theme-color
      let metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (!metaThemeColor) {
        metaThemeColor = document.createElement("meta")
        metaThemeColor.setAttribute("name", "theme-color")
        document.head.appendChild(metaThemeColor)
      }
      metaThemeColor.setAttribute("content", color)
      
      // Update Apple mobile web app status bar style color
      let metaAppleStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
      if (!metaAppleStatusBar) {
        metaAppleStatusBar = document.createElement("meta")
        metaAppleStatusBar.setAttribute("name", "apple-mobile-web-app-status-bar-style")
        document.head.appendChild(metaAppleStatusBar)
      }
      metaAppleStatusBar.setAttribute("content", isDark ? "black-translucent" : "default")
      
      // Update msapplication-TileColor
      let metaMsTileColor = document.querySelector('meta[name="msapplication-TileColor"]')
      if (!metaMsTileColor) {
        metaMsTileColor = document.createElement("meta")
        metaMsTileColor.setAttribute("name", "msapplication-TileColor")
        document.head.appendChild(metaMsTileColor)
      }
      metaMsTileColor.setAttribute("content", color)
    }
    
    // Initial update
    updateThemeColor()
    
    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          updateThemeColor()
        }
      })
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    
    return () => {
      observer.disconnect()
    }
  }, [])
  
  return null
}
