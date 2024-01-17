import React from "react";
import Image from "next/image";

import styles from "styles/modules/ExecCard.module.scss";

// TODO: consider separating into component that's more generic, and having ExecCard inherit from that
const ExecCard = ({ data, colour }) => {
  const { name, image, description, role } = data;

  return (
    <div className="col-md-4">
      <div className="card-person">
        <div className={`${styles["card-person-style" + colour]} limit`}>
          {description && (
            <>
              <div className={styles["card-person-animation"]} />
              <p className={styles["person-text"]}>{description}</p>
            </>
          )}
          <Image alt={name} src={image} className={styles["card-img-top"]} />
        </div>
      </div>
      <div className="card-body text-center pt-2 pb-4">
        <h4 className="about-name">{name}</h4>
        {role === "" ? null : <p className="about-role">{role}</p>}
      </div>
    </div>
  );
};

export default ExecCard;
