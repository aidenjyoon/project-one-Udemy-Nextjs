import Image from "next/image";
import Link from "next/link";
import AddressIcon from "../icons/AddressIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import DateIcon from "../icons/DateIcon";
import Button from "../ui/button";
import styles from "./EventItem.module.scss";

const EventItem = (props) => {
  const { title, image, date, location, id } = props;
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <li className={styles.item}>
      <Image src={"/" + image} alt={title} width={340} height={160} />
      <div className={styles.content}>
        <div className={styles.title}>
          <h2>TITLE</h2>
          <div className={styles.date}>
            <DateIcon />
            <time>DATE</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>ADDRESS {formattedAddress}</address>
          </div>
          <div className={styles.actions}>
            <Button link={exploreLink}>
              <span>Explore Event</span>
              <span className={styles.icon}>
                <ArrowRightIcon />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
