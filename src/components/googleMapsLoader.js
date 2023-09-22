const apiKey = process.env.REACT_APP_WEB_API;

const googleMapsLoaderPromise = (callback) => {
  if (window.google && window.google.maps) {
    callback(window.google.maps);
  } else {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps,places`;
    script.async = true;
    script.onload = () => {
      callback(window.google.maps);
    };
    script.onerror = (error) => {
      console.error("Google Maps API failed to load:", error);
    };
    document.body.appendChild(script);
  }
};

export default googleMapsLoaderPromise;