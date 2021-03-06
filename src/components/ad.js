import React from "react";
// import AdSense from "react-adsense"

export default class Ad extends React.Component {
  componentDidMount() {
    const target = document.getElementsByClassName('adsbygoogle')[0]
    const observer = new MutationObserver(records => {
      this.props.onLoad(records[0].target)
    })
    observer.observe(target, {
      attributes: true,
      attributeFilter: ['style']
    })

    try {
      if (window) (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (_error) {
      // do nothing
    }
  }
  
  render() {
    return (
      <ins className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9850282304993778"
        data-ad-slot="1979280137"
        data-ad-layout="in-article"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    )
  }
}

// const Ad = () => (
//   <div>
//     <AdSense.Google
//       client="ca-pub-9850282304993778"
//       slot="1979280137"
//       style={{ display: "block" }}
//       layout="in-article"
//       format="auto"
//       responsive="true"
//     />
//   </div>
// )
// export default Ad;
