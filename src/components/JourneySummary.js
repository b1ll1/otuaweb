import React from "react";

const JourneySummary = (props) => {
  return (
    <div className={`bg-white mx-3 my-1 rounded-lg shadow-xl w-full`}>
      <div className={`bg-${props.summary.colour}-300 rounded-t-lg flex justify-center items-center`}>
        <div
        className={`bg-white w-8 h-8 rounded-full shadow-lg m-1 flex items-center justify-center`}
        >
        <p className={`text-center text-xl`}>{props.summary.avatar}</p>
      </div>
          </div>
      <div className={`flex flex-row justify-between m-2`}>
      <div className={`justify-center`}>
        <div className={``}>📏: {props.summary.initialDistance}</div>
        <div className={``}>⌛: {props.summary.initialTime}</div>
        <div className={``}>💷 : £{props.summary.initialCost}</div>
      </div>
      <div className={`bg-${props.summary.colour}-300 w-5 h-5 self-center flex items-center justify-center rounded-full shadow-lg mb-2`}>
        <div className={`text-center text-xs`}>👉</div>
        </div>
      <div className={`justify-center`}>
        <div className={``}>📏: {props.summary.finalDistance}</div>
        <div className={``}>⌛: {props.summary.finalTime}</div>
        <div className={``}>💷 : £{props.summary.finalCost}</div>
      </div>
      </div>
    </div>
  );
};

export default JourneySummary;
