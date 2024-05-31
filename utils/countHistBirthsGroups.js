import { v4 as uuidv4 } from "uuid";

// Función para agrupar y estructurar los datos con porcentajes
// de chatgpt
export function groupByHistBirth(data) {
  const mainMap = new Map();
  let totalMainCount = 0;

  // Agrupa por histBirthMainPerson
  data.forEach((item) => {
    const { histBirthMainPerson, histBirthRelated } = item;

    if (!mainMap.has(histBirthMainPerson)) {
      mainMap.set(histBirthMainPerson, new Map());
    }

    const relatedMap = mainMap.get(histBirthMainPerson);

    if (!relatedMap.has(histBirthRelated)) {
      relatedMap.set(histBirthRelated, 0);
    }

    relatedMap.set(histBirthRelated, relatedMap.get(histBirthRelated) + 1);
    totalMainCount++;
  });

  // Construye la estructura final
  const result = [];

  mainMap.forEach((relatedMap, histBirthMainPerson) => {
    let mainCount = 0;
    relatedMap.forEach((count) => {
      mainCount += count;
    });

    const children = [];

    relatedMap.forEach((count, histBirthRelated) => {
      const percentage = ((count / mainCount) * 100).toFixed(1);
      children.push({
        id: uuidv4(),
        data: {
          histBirth: histBirthRelated,
          count,
          percentage: `${percentage}%`,
        },
      });
    });

    const mainPercentage = ((mainCount / totalMainCount) * 100).toFixed(1);
    result.push({
      id: uuidv4(),
      data: {
        histBirth: histBirthMainPerson,
        count: mainCount,
        percentage: `${mainPercentage}%`,
      },
      children,
    });
  });

  return result;
}
