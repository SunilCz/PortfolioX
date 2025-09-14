$(document).ready(function () {
  var entries = [
    {
      label: "HTML",
      url: "",
      target: "_top",
    },
    {
      label: "CSS",
      url: "",
      target: "_top",
    },
    {
      label: "ES5/ES6",
      url: "",
      target: "_top",
    },
    {
      label: "TypeScript",
      url: "",
      target: "_top",
    },
    {
      label: "REST",
      url: "",
      target: "_top",
    },
    { label: "JSON", url: "", target: "_top" },
    {
      label: "GSAP",
      url: "",
      target: "_top",
    },
    { label: "Angular", url: "", target: "_top" },
    { label: "Wordpress", url: "", target: "_top" },
    { label: "Shopify", url: "", target: "_top" },
    { label: "Node JS", url: "", target: "_top" },
    {
      label: "Git",
      url: "",
      target: "_top",
    },
    {
      label: "_lodash",
      url: "",
      target: "_top",
    },
    {
      label: "Bootstrap",
      url: "",
      target: "_top",
    },
    { label: "SASS", url: "", target: "_top" },
    {
      label: "ReactJS",
      url: "",
      target: "_top",
    },
    { label: "jQuery", url: "", target: "_top" },
    {
      label: "SQL",
      url: "",
      target: "_top",
    },
    {
      label: "Gulp",
      url: "",
      target: "_top",
    },
    { label: "npm", url: "", target: "_top" },
    {
      label: "BEM",
      url: "",
      target: "_top",
    },
  ];

  // Get responsive dimensions based on screen size
  function getResponsiveDimensions() {
    const screenWidth = window.innerWidth;
    let width, height, fontSize, tooltipFontSize, radiusMin;

    if (screenWidth <= 480) {
      // Mobile
      width = 280;
      height = 280;
      fontSize = "12";
      tooltipFontSize = "11";
      radiusMin = 50;
    } else if (screenWidth <= 768) {
      // Tablet
      width = 350;
      height = 350;
      fontSize = "14";
      tooltipFontSize = "12";
      radiusMin = 60;
    } else if (screenWidth <= 1024) {
      // Small desktop
      width = 400;
      height = 400;
      fontSize = "16";
      tooltipFontSize = "13";
      radiusMin = 65;
    } else {
      // Large desktop
      width = 450;
      height = 450;
      fontSize = "18";
      tooltipFontSize = "15";
      radiusMin = 75;
    }

    return { width, height, fontSize, tooltipFontSize, radiusMin };
  }

  const dimensions = getResponsiveDimensions();

  var settings = {
    //  an array of links
    entries: entries,

    // responsive width of tag cloud
    width: dimensions.width,

    // responsive height of tag cloud
    height: dimensions.height,

    // radius of tag cloud
    radius: "80%",

    // responsive min radius of tag cloud
    radiusMin: dimensions.radiusMin,

    // use background draw
    bgDraw: false,

    // background color
    bgColor: "#0000",

    // the behavior of the individual links / Tags
    opacityOver: 1,
    opacityOut: 0.1,
    opacitySpeed: 2,

    // how the content is presented
    fov: 1000,

    // animation speed
    speed: 0.7,

    // responsive font options
    fontFamily: "Arial, sans-serif",
    fontSize: dimensions.fontSize,
    fontColor: "#08fdd8",
    fontWeight: "bold",
    fontStyle: "normal",
    fontStretch: "normal",
    fontToUpperCase: false,

    // responsive tooltip options
    tooltipFontFamily: "Arial, sans-serif",
    tooltipFontSize: dimensions.tooltipFontSize,
    tooltipFontColor: "#fff",
    tooltipFontWeight: "normal", //bold
    tooltipFontStyle: "normal", //italic
    tooltipFontStretch: "normal", //wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
    tooltipFontToUpperCase: false,
    tooltipTextAnchor: "left",
    tooltipDiffX: 100,
    tooltipDiffY: 10,
  };

  // Initialize tag cloud
  function initializeTagCloud() {
    const dimensions = getResponsiveDimensions();

    var settings = {
      entries: entries,
      width: dimensions.width,
      height: dimensions.height,
      radius: "80%",
      radiusMin: dimensions.radiusMin,
      bgDraw: false,
      bgColor: "#0000",
      opacityOver: 1,
      opacityOut: 0.1,
      opacitySpeed: 2,
      fov: 1000,
      speed: 0.7,
      fontFamily: "Arial, sans-serif",
      fontSize: dimensions.fontSize,
      fontColor: "#08fdd8",
      fontWeight: "bold",
      fontStyle: "normal",
      fontStretch: "normal",
      fontToUpperCase: false,
      tooltipFontFamily: "Arial, sans-serif",
      tooltipFontSize: dimensions.tooltipFontSize,
      tooltipFontColor: "#fff",
      tooltipFontWeight: "normal",
      tooltipFontStyle: "normal",
      tooltipFontStretch: "normal",
      tooltipFontToUpperCase: false,
      tooltipTextAnchor: "left",
      tooltipDiffX: 100,
      tooltipDiffY: 10,
    };

    // Clear existing tag cloud and reinitialize
    $("#tag-cloud").empty();
    $("#tag-cloud").svg3DTagCloud(settings);
  }

  // Initialize on page load
  initializeTagCloud();

  // Reinitialize on window resize with debouncing
  let resizeTimeout;
  $(window).on("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      initializeTagCloud();
    }, 250); // Debounce resize events
  });
});
