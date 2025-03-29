// lib/StyledComponentsRegistry.tsx (Server Component)
import React from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const sheet = new ServerStyleSheet();

  try {
    const styledChildren = (
      <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>
    );

    // 這行會拿到 <style>，用來 SSR
    const styleTags = sheet.getStyleElement();

    // 把 <style> 放在前面，可以減少 FOUC
    return (
      <>
        {styleTags}
        {styledChildren}
      </>
    );
  } finally {
    sheet.seal();
  }
}
