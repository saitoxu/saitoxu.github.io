import React from "react";
import AdSense from 'react-adsense'

const Ad = () => (
  <div>
    <AdSense.Google
      client="ca-pub-9850282304993778"
      slot="1979280137"
      style={{ display: "block" }}
      layout="in-article"
      format="auto"
      responsive="true"
    />
  </div>
)
export default Ad;
