import React, { useEffect, useState } from "react";
import Image from "next/image";

import styles from "styles/modules/checkout.module.scss";

import { Row, Col, Card, Button } from "reactstrap";

const ClothingItem = ({ item, addToCart, removeFromCart }) => {
  return (
    <Row className={styles["clothingItem"]}>
      <Col style={{ display: "flex", flexDirection: "row" }}>
        <Image
          src={item.product.images[0]}
          width={200}
          height={200}
          alt="Picture of the clothing item"
        />
        <h3 style={{ marginTop: "10px" }}>{item.product.name}</h3>
      </Col>
      <Col className={styles["clothingRow"]}>
        <p>${item.price / 100}</p>
      </Col>
      <Col className={styles["clothingRow"]}>
        <div className={styles["quantityButtons"]}>
          <Button
            className="mt-4"
            color="primary"
            target="_blank"
            onClick={() => removeFromCart(item)}
          >
            -
          </Button>
          <p>{item.amount}</p>
          <Button
            className="mt-4"
            color="primary"
            target="_blank"
            onClick={() => addToCart(item)}
          >
            +
          </Button>
        </div>
      </Col>
      <Col className={styles["clothingRow"]}>
        <p>${(item.price / 100) * item.amount}</p>
      </Col>
    </Row>
  );
};

export default ClothingItem;
