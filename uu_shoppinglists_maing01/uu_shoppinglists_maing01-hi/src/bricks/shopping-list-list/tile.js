//@@viewOn:imports
import React from "react";
import { createVisualComponent, useRoute, Utils, useState, Lsi } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import Uu5TilesElements from "uu5tilesg02-elements";
import { Button } from "uu5g05-elements";
import importLsi from "../../lsi/import-lsi.js";


import { useUserContext } from "../users/user-context.js";

//@@viewOff:imports

const Tile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: "Uu5TilesElements.Mock.Tile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    let { data, ...otherProps } = props;
    const slicedArray = data.data.itemList.slice(0, 3);
    const [, setRoute] = useRoute();
    const [open, setOpen] = useState(false);

    const {loggedUser} = useUserContext();

    function handleDeleteList(event) {
      props.onDeleteList(new Utils.Event(data, event));
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <Uu5TilesElements.Tile
          {...otherProps}
          headerOverlap
          className={Config.Css.css({
            backgroundColor: data.data.isArchived ? "#dfd0a5" : "",
          })}
          footer={
            <div>
               <Button className={Config.Css.css({
                 marginBottom: 4,
                 marginRight: 4,
               })} 
               onClick={() => setRoute("detail",{ id: data.data.id })}><Lsi import={importLsi} path={["Tile", "detail"]} /></Button>
              {data.data.ownerId === loggedUser.id ? (
               <Button
               
               colorScheme="red"
               onClick={() => setOpen(true)}
             >
               <Lsi import={importLsi} path={["Tile", "delete"]} />
             </Button>
              ) : (
                ""
              )}
             
            </div>
          }
        >
          {({ padding }) => {
            return (
              <>
                <div
                  className={Config.Css.css({
                    paddingTop: padding.top,
                    paddingRight: padding.right,
                    paddingBottom: padding.bottom,
                    paddingLeft: padding.left,
                  })}
                >
                  <div>
                    <strong>{data.data.name}</strong>
                  </div>
                  <Uu5Elements.Line />
                  {slicedArray.map((item) => (
                    <div key={item.id}>
                      <Uu5Elements.Text>- {item.value}</Uu5Elements.Text>
                    </div>
                  ))}
                </div>
              </>
            );
          }}
        </Uu5TilesElements.Tile>
        <Uu5Elements.Dialog
          open={open}
          onClose={() => setOpen(false)}
          header={
            <Lsi
              lsi={{
                cs: "Smazat tento soubor?",
                en: "Delete this file?",
              }}
            />
          }
          icon={<Uu5Elements.Svg code="uugdssvg-svg-delete" />}
          info={
            <Lsi
              lsi={{
                cs: "Data souboru nelze obnovit",
                en: "File data cannot be recovered",
              }}
            />
          }
          actionDirection="horizontal"
          actionList={[
            {
              children: <Lsi lsi={{ en: "Cancel", cs: "Zrušit" }} />,
              onClick: () => console.log("Cancel"),
              significance: "distinct",
            },
            {
              children: <Lsi lsi={{ en: "Delete", cs: "Smazat" }} />,
              onClick: handleDeleteList,
              colorScheme: "red",
              significance: "highlighted",
            },
          ]}
        />
      </div>
    );
    //@@viewOff:render
  },
});

export default Tile;
