import React, { useState, useEffect } from 'react';
import { GOOGLE_REVIEWS, RAW_STORE_INFO } from '../data';
import { Review } from '../types';
import { Star, MessageSquare, AlertCircle, Sparkles, Award } from 'lucide-react';

export default function Reviews() {
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  
  // Form State
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Load reviews from localstorage or static data
  useEffect(() => {
    const stored = localStorage.getItem('patiala_reviews');
    if (stored) {
      setReviewsList(JSON.parse(stored));
    } else {
      setReviewsList(GOOGLE_REVIEWS);
      localStorage.setItem('patiala_reviews', JSON.stringify(GOOGLE_REVIEWS));
    }
  }, []);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) return;

    const newReview: Review = {
      id: `custom-${Date.now()}`,
      author: authorName,
      rating: rating,
      text: reviewText,
      date: 'Just now',
      avatarLetter: authorName.trim()[0].toUpperCase()
    };

    const updated = [newReview, ...reviewsList];
    setReviewsList(updated);
    localStorage.setItem('patiala_reviews', JSON.stringify(updated));

    // Reset Form
    setAuthorName('');
    setRating(5);
    setReviewText('');
    setShowForm(false);
    setSuccessMessage('Thank you! Your verified review has been published.');
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500">
            Customer Reviews & Feedback
          </h1>
          <div className="w-20 h-0.5 bg-amber-500 mx-auto mt-4" />
          <p className="text-stone-400 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            Honest feedback from Pakistani brides, families, and gold investors who have shopped at our Parsi Market branch on Murree Road, Rawalpindi.
          </p>
        </div>

        {/* Aggregate Ratings Overview */}
        <div className="bg-stone-900 border border-amber-500/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center md:text-left space-y-2">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-200">Our Reputation on Google</h3>
            <p className="text-stone-400 text-xs sm:text-sm font-sans">
              Patiala Jewellers maintains one of the highest trust scores among Rawalpindi goldsmiths.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center bg-stone-950/80 px-6 py-5 rounded-2xl border border-stone-850">
              <span className="block text-5xl font-extrabold text-amber-300 tracking-tight font-mono">
                {RAW_STORE_INFO.rating}
              </span>
              <div className="flex gap-1 text-amber-400 justify-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                ))}
              </div>
              <span className="text-[10px] text-stone-500 font-mono mt-1 block uppercase tracking-widest">
                {RAW_STORE_INFO.reviewCount} total reviews
              </span>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-6 py-3.5 rounded-xl text-sm tracking-wide transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              id="write-review-btn"
            >
              <MessageSquare className="w-4.5 h-4.5 fill-current" /> Write a Review
            </button>
          </div>
        </div>

        {/* Write Review Form */}
        {showForm && (
          <form
            onSubmit={handleSubmitReview}
            className="bg-stone-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl"
            id="review-form"
          >
            <h3 className="font-serif text-lg font-bold text-stone-200">Share Your Experience</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-stone-400 block">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Farooq Ahmad"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-850 hover:border-amber-500/30 focus:border-amber-400 focus:outline-none text-stone-100 text-sm p-3 rounded-xl transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-stone-400 block">Rating (Stars)</label>
                <div className="flex gap-1 bg-stone-950 p-3 rounded-xl border border-stone-850">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-2xl focus:outline-none transition-transform hover:scale-115 cursor-pointer"
                    >
                      <Star className={`w-6 h-6 ${star <= rating ? 'fill-current text-amber-400' : 'text-stone-600'}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-stone-400 block">Your Review</label>
              <textarea
                required
                rows={4}
                placeholder="Tell us about the gold purity, making charges, design variety, or customer service at Murree Road..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full bg-stone-950 border border-stone-850 hover:border-amber-500/30 focus:border-amber-400 focus:outline-none text-stone-100 text-sm p-3 rounded-xl transition-all"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 bg-stone-800 hover:bg-stone-750 text-stone-300 rounded-xl text-xs font-bold uppercase cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl text-xs font-bold uppercase shadow-lg cursor-pointer"
                id="submit-review"
              >
                Publish Review
              </button>
            </div>
          </form>
        )}

        {/* Success Alert Banner */}
        {successMessage && (
          <div className="bg-emerald-950/70 border border-emerald-500/40 p-4 rounded-xl flex items-center gap-3 text-emerald-300 shadow-lg">
            <Sparkles className="w-5 h-5 shrink-0" />
            <p className="text-sm font-semibold">{successMessage}</p>
          </div>
        )}

        {/* Reviews Listing */}
        <div className="space-y-6">
          <h3 className="font-serif text-2xl font-semibold text-stone-200 border-b border-stone-850 pb-3">
            Recent Verified Customer Reviews
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviewsList.map((review) => (
              <div
                key={review.id}
                className="bg-stone-900 border border-stone-800/80 p-6 rounded-2xl space-y-4 hover:border-amber-500/20 transition-all shadow-md flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Author Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-950 border border-stone-800 text-amber-400 flex items-center justify-center font-bold font-serif text-lg">
                      {review.avatarLetter}
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-stone-200 text-sm sm:text-base">{review.author}</h4>
                      <span className="text-[10px] text-stone-500 font-mono block">{review.date}</span>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current text-amber-400' : 'text-stone-700'}`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed italic">
                    "{review.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-850/60 flex items-center gap-1.5 text-stone-500">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[9px] uppercase font-mono tracking-widest">Verified Showroom Buyer</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integrity Notice */}
        <div className="bg-stone-900/40 border border-stone-850 p-4 rounded-xl flex items-start gap-3 text-stone-500">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed font-sans">
            Our reviews represent authentic experiences. We are committed to gold purification benchmarks, transparent carat balances, and verified kundan craftsmanship. No reviews are fabricated or sponsored.
          </p>
        </div>
      </div>
    </div>
  );
}
