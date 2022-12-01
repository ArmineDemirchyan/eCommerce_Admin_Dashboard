import React from "react";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./Home.css";
import Chart from "../../components/chart/Chart";
import { userData } from "../../dummyData";
const Home = () => {
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userData}
        title="User Analytics"
        dataKey="Active User"
        grid
      />
    </div>
  );
};

export default Home;
