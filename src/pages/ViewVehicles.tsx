import { useGetAllVehicles, Vehicle } from "../services/mockQuery.hook";

import React, { useState, ChangeEvent } from "react";
import styles from "./ViewVehicles.module.css";
import { composeClasses, sortVehicles } from "../libs/utils";
import Modal from "../components/Modal/Modal";

export interface ViewVehiclesProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  sortOptions: string[];
  defaultSortOption?: string;
}

const ViewVehicles: React.FC<ViewVehiclesProps> = ({
  className = "",
  sortOptions,
  defaultSortOption = "price",
  ...props
}: ViewVehiclesProps) => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const { vehicles, isLoading, isRefetching, setVehicles } = useGetAllVehicles(
    defaultSortOption
  );

  const onSelectVehicleItem = (event: React.MouseEvent<HTMLLIElement>) => {
    const item = event.currentTarget as HTMLLIElement;
    setSelectedVehicle(vehicles[Number(item.dataset["itemkey"])]);
    /* eslint-disable-next-line no-restricted-globals */
    location.hash = "#vehicle";
  };

  const onSortTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    const { value } = event.target.options[selectedIndex];

    setVehicles(sortVehicles(vehicles, value));
  };

  return (
    <div className={composeClasses(className, styles.pageWrapper)} {...props}>
      <form>
        <select onChange={onSortTypeChange}>
          {sortOptions.map((sortOption: string, index: number) => {
            return (
              <option
                key={String(index)}
                defaultValue={defaultSortOption}
                value={sortOption}
              >
                {sortOption.replace(/^(?:([a-z]+)\.)?/, "")}
              </option>
            );
          })}
        </select>
      </form>
      {isLoading || isRefetching ? (
        <span>Loading....</span>
      ) : (
        <ul className={styles.vehicleItemBox}>
          {vehicles.map((vehicle: Vehicle, index: number) => (
            <li
              key={String(index)}
              data-itemkey={String(index)}
              onClick={onSelectVehicleItem}
              className={styles.vehicleItem}
            >
              <div className={composeClasses(className, styles.imgContainer)}>
                <img src={vehicle.photo} alt={vehicle.make} />
              </div>
              <div className={styles.textContainer}>
                <h2 className={styles.makeTitle}>{vehicle.make}</h2>
                <article className={styles.otherTitles}>
                  <p>
                    <strong>Model:</strong> <span>{vehicle.model}</span>
                  </p>

                  <p>
                    <strong>Price:</strong>{" "}
                    <span>{parseInt(vehicle.price, 10)}</span>
                  </p>
                </article>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Modal
        id={"vehicle"}
        headingText={"Vehicle Selected"}
        ctaButtonClickHandler={(e) => !e}
      >
        {selectedVehicle === null ? (
          selectedVehicle
        ) : (
          <div className={styles.modalDeatils}>
            <article>
              <p>
                <strong>Colors:</strong>{" "}
                <span>{String(selectedVehicle.colors)}</span>
              </p>
              <p>
                <strong>Price:</strong>{" "}
                <span>{parseInt(selectedVehicle.price, 10)}</span>
              </p>
              <p>
                <strong>Range:</strong>{" "}
                <span>
                  {selectedVehicle.range.distance}
                  {selectedVehicle.range.unit}
                </span>
              </p>
            </article>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ViewVehicles;
