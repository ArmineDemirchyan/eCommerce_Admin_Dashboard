import React, { useEffect, useMemo, useState } from "react";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./Home.css";
import Chart from "../../components/chart/Chart";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { userRequest } from "../../requestMethods";
const Home = () => {
  const [userStats,setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(()=>{
    const getStats =  async  () => {
      try{
        const res = await userRequest.get("users/stats")
        res.data.map(item=>{
          setUserStats(prev=>[
            ...prev,
            {name:MONTHS[item._id-1], "Active User":item.total}
          ])
        })
      }catch{}
    }
    getStats();
  },[MONTHS])
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        dataKey="Active User"
        grid
      />
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
};

export default Home;
