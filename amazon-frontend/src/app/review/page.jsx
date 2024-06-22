"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function Component() {
  const [reviews, setReviews] = useState([
    {
      username: "John Doe",
      rating: 3,
      review: "This product is amazing! I highly recommend it.",
    },
    {
      username: "Jane Smith",
      rating: 4,
      review:
        "I'm really impressed with the quality of this product. It exceeded my expectations.",
    },
  ]);
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(3);
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setReviews([...reviews, { username, rating, review }]);
    setUsername("");
    setRating(3);
    setReview("");
  };

  const handleDelete = (index) => {
    const newReviews = reviews.filter((_, i) => i !== index);
    setReviews(newReviews);
  };

  const handleCheckAuthenticReviews = async() => {
    // Implement your logic to check for authentic reviews
    let data = [];
    reviews.forEach((r)=>{
        data = [...data, r.review]
    })
    console.log(data);
    const res = await axios.post("http://127.0.0.1:5000/rate-product", data);
    console.log(res);
    alert("Authenticity check performed on reviews");
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16 bg-[#f1f1f1]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Leave a Review</h1>
        <form
          className="bg-background rounded-lg shadow-md p-6 space-y-4 bg-white"
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
            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-foreground py-1"
              >
                Rating
              </label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`w-6 h-6 ${
                      star <= rating ? "text-primary" : "text-muted-foreground"
                    }`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
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
              rows={4}
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
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-background rounded-lg shadow-md p-4 bg-white"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{review.username}</div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`w-5 h-5 ${
                          star <= review.rating
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
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

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
