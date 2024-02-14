import { Star } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ReviewsBarChart.css";

const ReviewsBarChart = () => {
  const { product } = useSelector((state) => state.singleProduct);

  const [reviewChartData, setReviewChartData] = useState({
    star5: 0,
    star4: 0,
    star3: 0,
    star2: 0,
    star1: 0,
  });

  useEffect(() => {
    setReviewChartData(calculateReviewChartData(product?.Reviews));
  }, [product]);

  const calculatePercentage = (count, total) => {
    return ((count / total) * 100).toFixed(2);
  };

  const calculateTotal = (ratingsMap) => {
    return Object.values(ratingsMap).reduce((acc, count) => acc + count, 0);
  };

  const calculateReviewChartData = (data) => {
    const ratingsMap = {};

    // Check if data is defined before processing
    if (data) {
      data.forEach((item) => {
        ratingsMap[`star${item.fRating}`] =
          (ratingsMap[`star${item.fRating}`] || 0) + 1;
      });
    }

    const total = calculateTotal(ratingsMap);

    return {
      star5: calculatePercentage(ratingsMap.star5 || 0, total),
      star4: calculatePercentage(ratingsMap.star4 || 0, total),
      star3: calculatePercentage(ratingsMap.star3 || 0, total),
      star2: calculatePercentage(ratingsMap.star2 || 0, total),
      star1: calculatePercentage(ratingsMap.star1 || 0, total),
    };
  };

  return (
    <div>
      <div className="reviewschart">
        <div className="spreviewitemswrapper">
          <div className="barchartbaritem">
            <p className="barchartbaritemleftlable">
              5 <Star />
            </p>
            <div className="barchartbar">
              <span style={{ width: `${reviewChartData.star5 || 0}%` }}>
                <span className="fill"></span>
              </span>
            </div>
            <p>
              {reviewChartData.star5 < 10
                ? "0" + reviewChartData.star5
                : reviewChartData.star5}
              %
            </p>
          </div>
          <div className="barchartbaritem">
            <p className="barchartbaritemleftlable">
              4 <Star />
            </p>
            <div className="barchartbar">
              <span style={{ width: `${reviewChartData.star4 || 0}%` }}>
                <span className="fill"></span>
              </span>
            </div>
            <p>
              {reviewChartData.star4 < 10
                ? "0" + reviewChartData.star4
                : reviewChartData.star4}
              %
            </p>
          </div>
          <div className="barchartbaritem">
            <p className="barchartbaritemleftlable">
              3 <Star />
            </p>
            <div className="barchartbar">
              <span style={{ width: `${reviewChartData.star3 || 0}%` }}>
                <span className="fill"></span>
              </span>
            </div>
            <p>
              {reviewChartData.star3 < 10
                ? "0" + reviewChartData.star3
                : reviewChartData.star3}
              %
            </p>
          </div>
          <div className="barchartbaritem">
            <p className="barchartbaritemleftlable">
              2 <Star />
            </p>
            <div className="barchartbar">
              <span style={{ width: `${reviewChartData.star2 || 0}%` }}>
                <span className="fill"></span>
              </span>
            </div>
            <p>
              {reviewChartData.star2 < 10
                ? "0" + reviewChartData.star2
                : reviewChartData.star2}
              %
            </p>
          </div>
          <div className="barchartbaritem">
            <p className="barchartbaritemleftlable">
              1 <Star />
            </p>
            <div className="barchartbar">
              <span style={{ maxWidth: `${reviewChartData.star1 || 0}%` }}>
                <span className="fill"></span>
              </span>
            </div>
            <p>
              {reviewChartData.star1 < 10
                ? "0" + reviewChartData.star1
                : reviewChartData.star1}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsBarChart;
