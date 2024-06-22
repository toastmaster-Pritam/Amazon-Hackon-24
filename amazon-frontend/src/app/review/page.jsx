"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import "./custom.css";

export default function Component() {
  const [reviews, setReviews] = useState([
    {
      username: "John Doe",
      review: "This product is amazing! I highly recommend it.",
    },
    {
      username: "Jane Smith",
      review:
        "I'm really impressed with the quality of this product. It exceeded my expectations.",
    },
  ]);
  const [username, setUsername] = useState("");
  const [review, setReview] = useState("");
  const [fakeReviewPercentage, setFakeReviewPercentage] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setReviews([...reviews, { username, review }]);
    setUsername("");
    setReview("");
  };

  const handleDelete = (index) => {
    const newReviews = reviews.filter((_, i) => i !== index);
    setReviews(newReviews);
  };

  const handleCheckAuthenticReviews = async () => {
    let data = [];
    reviews.forEach((r) => {
      data = [...data, r.review];
    });
    console.log(data);
    const res = await axios.post("http://127.0.0.1:5000/rate-product", {
      reviews: data,
    });
    console.log(res);
    let fake = res.data.Fake;
    let total = res.data.Total;
    let reviewsPercent = (fake / total) * 100
    const formattedPercentage = reviewsPercent.toFixed(2);
    setFakeReviewPercentage(formattedPercentage);
    toast.success("Authenticity check performed on reviews");
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-10 bg-[#f1f1f1]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Leave a Review</h1>
        <form
          className="bg-background rounded-lg shadow-md p-6 space-y-3 bg-white"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-foreground py-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Enter your username"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="review"
              className="block text-sm font-medium text-foreground py-1"
            >
              Review
            </label>
            <textarea
              id="review"
              rows={2}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Write your review"
            />
          </div>
          <Button type="submit" className="w-full">
            Add Review
          </Button>
        </form>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-2">Reviews</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-red-600 bg-red-100 p-1 rounded-sm">Fake Reviews %</span>
              <span className="text-sm font-medium">{fakeReviewPercentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-4 mb-2">
              <div
                className="bg-red-500 h-full rounded-full"
                style={{ width: `${fakeReviewPercentage}%` }}
              />
            </div>
          </div>
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-background rounded-lg shadow-md p-4 bg-white"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{review.username}</div>
                </div>
                <p className="text-muted-foreground">{review.review}</p>
                <Button onClick={() => handleDelete(index)} className="mt-2">
                  Delete Review
                </Button>
              </div>
            ))}
          </div>
          <Button
            onClick={handleCheckAuthenticReviews}
            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-green-500 text-white"
          >
            Check Authentic Reviews
          </Button>
        </div>
      </div>
    </div>
  );
}
