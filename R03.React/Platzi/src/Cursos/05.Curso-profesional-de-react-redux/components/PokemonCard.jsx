import React from "react";
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { StarOutlined } from "@ant-design/icons";

function PokemonCard(props) {
    const { name, url_img } = props;

    return (
        <Card
            extra={<StarOutlined />}
            title={name}
            cover={<img src={url_img} alt={name} />}
        >
            <Meta description="fire, magic" />
        </Card>
    );
}

export default PokemonCard;
