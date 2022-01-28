import Document, { Html, Head, Main, NextScript } from "next/document";

// for creating a custom Document.
// usually used to augment <html> and <body> tags
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
