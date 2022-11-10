import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../AuthContext/AuthContex";
import PrivateRoute from "../../Routes/PrivateRoute";
import Messages from "../Messages/Messages";

const ServiceDetails = () => {
  const ServiceDetails = useLoaderData();
  const [load, setLoad] = useState(false);
  const { description, img, Price, _id } = ServiceDetails;
  const { title, body } = description[0];
  const { user } = useContext(UserContext);
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    fetch("https://maseter-builder-servar.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => {
        const ReviewData = data.filter((RevId) => RevId.serviceId === _id);

        // console.log(ReviewData);
        // get only matching comment
        setAllReviews(ReviewData);
      });
  }, []);

  const handleReviews = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = user?.email || "unregistered";
    const message = form.message.value;
    const current = new Date();
    const time = current.toLocaleTimeString("en-US");
    const date =
      current.getFullYear() +
      "-" +
      (current.getMonth() + 1) +
      "-" +
      current.getDate();
    const review = {
      serviceId: _id,
      serviceName: ServiceDetails?.title,
      Price,
      customer: user?.displayName,
      email,
      message,
      image: user?.photoURL,
      time,
      date,
      img,
    };

    fetch("https://maseter-builder-servar.vercel.app/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success("review added");
          form.reset();
        }
      })
      .catch((er) => console.error(er));
  };

  return (
    <div className="m-5">
      {/* service-details section */}
      <section>
        <h3 className="font-bold lg:text-4xl capitalize lg:w-3/5 my-5">
          {title}
        </h3>
        <div className="lg:flex gap-5 ">
          <div className="w-6/12 mx-auto">
            <img src={img} alt="" />
            <p>
              <small>{ServiceDetails?.title}</small>
            </p>
          </div>
          <div className="w-6/12 mx-auto">
            <p className="text-2xl capitalize">{body?.slice(0, 1000)}</p>
          </div>
        </div>
      </section>
      {/* review section  */}
      <section className="border my-5 p-5">
        <form onSubmit={handleReviews} className="">
          <h4 className="text-3xl font-bold capitalize my-4">
            please review {ServiceDetails.title}
          </h4>

          <textarea
            name="message"
            className="textarea textarea-bordered h-48 w-full mt-2"
            placeholder="Your Message"
            required
          ></textarea>

          <button className="btn btn-outline btn-primary" type="submit">
            {user?.email ? (
              <button type="submit"> Review</button>
            ) : (
              <Link to="/login"> please login first </Link>
            )}
          </button>
        </form>
      </section>

      <section>
        <div>
          {allReviews?.map((Reviews) => (
            <Messages
              setLoad={setLoad}
              key={Reviews._id}
              Reviews={Reviews}
            ></Messages>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServiceDetails;
