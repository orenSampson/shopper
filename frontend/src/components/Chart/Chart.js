import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { getChartData } from "../../api/shopperAPI";

const Chart = () => {
  const [chartDataOptions, setChartDataOptions] = useState({});

  useEffect(() => {
    async function fetchData() {
      const data = await getChartData();

      const xAxisData = [];
      const yAxisProductViews = [];
      const yAxisRevenue = [];

      for (let i = 0; i < data.length; i++) {
        const elementDate = new Date(data[i].date);

        const monthShort = elementDate.toLocaleString("default", {
          month: "short",
        });
        const year = elementDate.getFullYear();

        xAxisData.push(`${monthShort}, ${year}`);
        yAxisProductViews.push(data[i].product_views);
        yAxisRevenue.push(data[i].revenue);
      }

      const options = {
        title: {
          text: "",
        },
        xAxis: {
          categories: null,
        },
        series: [],
      };

      options.xAxis.categories = xAxisData;

      options.series.push({
        name: "Product views",
        data: yAxisProductViews,
      });

      options.series.push({
        name: "Revenues",
        data: yAxisRevenue,
      });

      setChartDataOptions(options);
    }
    fetchData();
  }, []);

  return <HighchartsReact highcharts={Highcharts} options={chartDataOptions} />;
};

export default Chart;
