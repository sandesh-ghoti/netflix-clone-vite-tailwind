/* eslint-disable react/prop-types */
const YtPlayer = ({ YTkey }) => {
  return (
    YTkey && (
      <iframe
        className=" w-full aspect-video max-h-full "
        src={`https://www.youtube.com/embed/${YTkey}?autoplay=1&controls=0&&showinfo=0&loop=1`}
        title="YouTube video player"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        onMouseOver={(e) => {
          e.preventDefault;
        }}
        onContextMenu={(e) => {
          e.preventDefault;
        }}
        onClick={(e) => {
          e.preventDefault;
        }}
        onDoubleClick={(e) => {
          e.preventDefault;
        }}
      ></iframe>
    )
  );
};

export default YtPlayer;
