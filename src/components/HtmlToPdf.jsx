"use client";
import { parseHtml } from "@/utils/parseHtml";
import { useMemo } from "react";

const HtmlToPdf = ({ html }) => {
  // 1. Parse once per input
  const ast = useMemo(() => parseHtml(html), [html]);

  // 2. Recursively map AST to React elements
  const children = useMemo(() => ast.map(renderNode), [ast]);

  return <>{children}</>; // ready to drop into <Page>
};

export default HtmlToPdf;

import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { Fragment } from "react";

const styles = StyleSheet.create({
  paragraph: { marginBottom: 8 },
  list: { paddingLeft: 0, marginBottom: 8 },
  listItem: { marginBottom: 4, fontSize: "8px", lineHeight: 0.8 },
  heading1: { fontSize: 12, fontWeight: "bold", marginBottom: 2 },
});

/**
 * Render a parsed AST node into @react-pdf/renderer components.
 * Supports: <p>, <ul>, <ol>, <li>, text, and h1
 */
export function renderNode(node, index = 0, listType = null, itemIndex = 0) {
  if (node.data) {
    return node.data;
  }

  const children = node.children?.map((child, i) =>
    renderNode(
      child,
      i,
      node.name === "ol" || node.name === "ul" ? node.name : listType,
      i
    )
  );

  switch (node.name) {
    case "p":
      return (
        <Text key={index} style={styles.paragraph}>
          {children}
        </Text>
      );

    case "ul":
    case "ol":
      return (
        <View key={index} style={styles.list}>
          {children}
        </View>
      );

    case "li":
      const bullet = listType === "ol" ? `${itemIndex + 1}. ` : "• ";
      return (
        <Text key={index} style={styles.listItem}>
          {bullet}
          {children}
        </Text>
      );
    case "h3":
      return (
        <Text key={index} style={styles.heading1}>
          {children}
        </Text>
      );

    default:
      return <Fragment key={index}>{children}</Fragment>;
  }
}
