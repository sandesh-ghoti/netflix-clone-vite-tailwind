/* eslint-disable react/prop-types */
const YtPlayer = ({ YTkey, autoplay = 0, loop = 0 }) => {
  return (
    YTkey && (
      <iframe
        className=" w-full aspect-video max-h-full "
        src={`https://www.youtube.com/embed/${YTkey}?autoplay=${autoplay}&controls=0&&showinfo=0&loop=${loop}`}
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
