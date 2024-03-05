/**
 * fetch all the treanding movies and tv shows today
 * fetch all now playing movies and tv shows
 * and store them in store
 */

import { category, options, requests } from "../constants";
import { addTrending } from "../utils/movieSlice";
export async function fetchTrending(media_type, period, page) {
  let res = await fetch(
    requests.trending + "/" + media_type + period,
    options()
  );
  res = await res?.json();
  return res;
}
async function fetchNowPlaying(media_type, period, page) {
  let res = await fetch(
    requests[media_type] + "/" + media_type + period,
    options()
  );
  res = await res?.json();
  return res;
}
