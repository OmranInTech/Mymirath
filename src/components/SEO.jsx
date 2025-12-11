import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title, description, keywords, image, url }) => {
  return (
    <Helmet>
      {/* Page title */}
      <title>{title || "MyMirath - Islamic Inheritance Calculator"}</title>

      {/* Meta tags */}
      <meta
        name="description"
        content={description || "MyMirath is a Shariah-compliant Islamic inheritance calculator. Calculate shares for children, spouses, parents, siblings, and more accurately."}
      />
      <meta
        name="keywords"
        content={keywords || "Islamic inheritance calculator, Shariah inheritance, Mirath, Muslim inheritance, Heir shares, Fatwas"}
      />
      <meta name="author" content="Omran Ahmadzai" />

      {/* Open Graph / Social sharing */}
      <meta property="og:title" content={title || "MyMirath - Islamic Inheritance Calculator"} />
      <meta
        property="og:description"
        content={description || "MyMirath is a Shariah-compliant Islamic inheritance calculator. Calculate shares for children, spouses, parents, siblings, and more accurately."}
      />
      <meta property="og:image" content={image || "https://mymirath.netlify.app/images/m1.png"} />
      <meta property="og:url" content={url || "https://mymirath.netlify.app"} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || "MyMirath - Islamic Inheritance Calculator"} />
      <meta
        name="twitter:description"
        content={description || "MyMirath is a Shariah-compliant Islamic inheritance calculator. Calculate shares for children, spouses, parents, siblings, and more accurately."}
      />
      <meta name="twitter:image" content={image || "https://mymirath.netlify.app/images/m1.png"} />

      {/* Google Analytics */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-6FER8K7TN8" />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-6FER8K7TN8');
        `}
      </script>
    </Helmet>
  );
};

export default SEO;
