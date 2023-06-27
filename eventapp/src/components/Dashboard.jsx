import React, { useState, useEffect } from "react";
import AddEvent from "./components/AddEvent";

function Dashboard(props) {
  const [ads, setAds] = useState([
    {
      name: "This is a test event",
      date: "25th February",
      description: "This is my event description",
    },
    {
      name: "This is a different test event",
      date: "16th April",
      description: "This is a different description",
    },
  ]);
  const [currentAd, setCurrentAd] = useState(ads[0]);

  // Refresh the list of adverts
  const refreshList = () => {
    // props.client.getAds().then((res) => {
    //   setAds(res.data);
    // });
  };

  // Remove an advert
  const removeAdvert = (id) => {
    props.client.removeAd(id).then(() => refreshList());
  };

  // Update an advert
  const updateAdvert = (ad) => {
    setCurrentAd(ad);
  };

  // Refresh the list of adverts when the component is mounted
  useEffect(() => {
    refreshList();
  }, []);

  // Build the rows of the table of adverts
  const buildrows = () => {
    return ads.map((currentAd) => {
      return (
        <tr key={currentAd._id}>
          <td>{currentAd.name}</td>
          <td>{currentAd.date}</td>
          <td>{currentAd.description}</td>
          <td>
            <button onClick={() => removeAdvert(currentAd._id)}> remove</button>
            <button onClick={() => updateAdvert(currentAd)}> update</button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      Dashboard
      <br />
      <table>
        <thead>
          <tr>
            <th>Advert Name</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{buildrows()}</tbody>
      </table>
      <br />
      <br />
      <AddEvent
        refreshList={() => {
          refreshList();
          setCurrentAd(undefined);
        }}
        currentAd={currentAd}
      />
    </>
  );
}

export default Dashboard;
