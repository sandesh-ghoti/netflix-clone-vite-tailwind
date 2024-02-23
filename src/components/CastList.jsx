/* eslint-disable react/prop-types */
import CastCard from "./CastCard";

const CastList = ({ list }) => {
  return (
    <ul className="flex flex-row overflow-scroll h-96 w-full gap-3 max-md:h-56 max-lg:h-72">
      {list.map((person) => {
        return (
          person?.profile_path && (
            <li
              key={person?.credit_id}
              className="flex-shrink-0 w-28 md:w-40 lg:w-56"
            >
              <CastCard
                data={{
                  credit_id: person.credit_id,
                  id: person.id,
                  name: person?.name,
                  character:
                    person?.known_for_department +
                    " - " +
                    (person?.job ? person?.job : person?.character),
                  profile_path: person?.profile_path,
                }}
              />
            </li>
          )
        );
      })}
    </ul>
  );
};

export default CastList;
