const composeClasses = (...styles: unknown[]): string => {
  return styles.filter((item) => item).join(" ");
};

function sortVehicles<T>(vehicles: T[] = [], type: string): T[] {
  return vehicles.slice(0).sort(function sorter(previousVehicle, nextVehicle) {
    let previousAttribute: number | object = 0;
    let nextAttribute: number | object = 0;

    if (type.indexOf(".") === -1) {
      previousAttribute = parseInt(previousVehicle[type] as string, 10);
      nextAttribute = parseInt(nextVehicle[type] as string, 10);
    } else {
      const [superType, ...subTypes] = type.split(".");
      previousAttribute = previousVehicle[superType] as object;
      nextAttribute = nextVehicle[superType] as object;

      if (subTypes.length > 0) {
        subTypes.forEach((subType: string) => {
          previousAttribute = parseInt(
            previousAttribute[subType] as string,
            10
          );
          nextAttribute = parseInt(nextAttribute[subType] as string, 10);
        });
      }
    }

    if (previousAttribute < nextAttribute) {
      return -1;
    } else if (previousAttribute > nextAttribute) {
      return 1;
    }
    return 0;
  });
}

export { composeClasses, sortVehicles };
