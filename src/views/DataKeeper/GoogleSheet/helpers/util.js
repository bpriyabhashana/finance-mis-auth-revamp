export function getQuestionSet(array, topic, version) {
  let Question_Set = [];
  for (var index = 0; index < array.length; index++) {
    if (
      (array[index].Topic === topic &&
        array[index].ProductVersions.includes(version)) ||
      (array[index].Topic === topic && version === "All")
    ) {
      Question_Set.push(array[index]);
    }
  }
  return Question_Set;
}

export function getQuestionSetScenario(array, topic, ScenarioName) {
  let Question_Set = [];
  for (var index = 0; index < array.length; index++) {
    if (
      array[index].Topic === topic &&
      array[index].ScenarioID === ScenarioName
    ) {
      Question_Set.push(array[index]);
    }
  }
  return Question_Set;
}

export function versionCompatible(versionList, version) {
  try {
    let array = versionList.replace(/\s/g, "").split(",");
    let element = version.replace(/\s/g, "").toString();
    if (array === undefined) {
      return new Error("No details about version");
    }
    for (var i = 0; i < array.length; i++) {
      if (array[i] === element) {
        return true;
      }
    }
    return false;
  } catch (error) {
    return new Error("No details about version");
  }
}

export function getValue(sheetData, row, col) {
  if (sheetData[0].rowData[row] !== undefined) {
    if (sheetData[0].rowData[row].values[col] !== undefined) {
      if (sheetData[0].rowData[row].values[col].formattedValue !== undefined) {
        return sheetData[0].rowData[row].values[col].formattedValue;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
}
// Use For Arrange MCQ Quesiton
export function getMCQQuestion(SheetData, row, Sheettitle) {
  let QuestionDataIndex = [1, 2, 3, 4, 5, 12, 14, 15, 16, 17, 18, 19, 20];
  QuestionDataIndex.forEach(index => {
    if (getValue(SheetData, row, index) === null) {
      return new Error(
        "Empty Cell In QUESTION_POOL Sheet . Row : " +
          (row + 1) +
          " Col : " +
          (index + 1)
      );
    }
  });
  var QuestionData = {
    QuestionID: parseInt(getValue(SheetData, row, 0), 10),
    State: getValue(SheetData, row, 1),
    Topic: getValue(SheetData, row, 2),
    SimilarityID: getValue(SheetData, row, 3),
    ProductVersions: getValue(SheetData, row, 4)
      .replace(/\s/g, "")
      .split(","),
    Question: getValue(SheetData, row, 5),
    NumberOfAnswer: parseInt(getValue(SheetData, row, 13), 10),
    IsMultiple: getValue(SheetData, row, 14) === "TRUE",
    IsSample: getValue(SheetData, row, 15) === "TRUE",
    CreatedBy: getValue(SheetData, row, 16),
    DateCreated: getValue(SheetData, row, 17),
    VerifiedBy: getValue(SheetData, row, 18),
    DateVerified: getValue(SheetData, row, 19),
    Group: getValue(SheetData, row, 20),
    GoogleSheetID: "QUESTION_POOL!A" + (row + 1)
  };
  let Answer = [];
  let NumberOfAnswer = parseInt(getValue(SheetData, row, 12), 10);
  if (NumberOfAnswer < 2) {
    return new Error(
      "Atleast two answer required: " + row + " In " + Sheettitle
    );
  }
  var CorrectCount = 0;
  for (var AnswerIndex = 0; AnswerIndex < NumberOfAnswer; AnswerIndex++) {
    if (IsCorrect(SheetData, row, AnswerIndex, 6)) {
      CorrectCount += 1;
    }
    if (CorrectCount > 1) {
      if (!QuestionData.IsMultiple) {
        return new Error(
          "Single Selection Question Cannot be hold Multiple Answers. Row : " +
            row +
            " In " +
            Sheettitle
        );
      }
    }
    Answer[AnswerIndex] = {
      Answer: getValue(SheetData, row, 6 + AnswerIndex),
      Position: parseInt(getPosition(SheetData, row, AnswerIndex, 6), 10),
      IsCorrect: IsCorrect(SheetData, row, AnswerIndex, 6)
    };
  }
  if (CorrectCount < 1) {
    return new Error(
      "Atleast one answer should be in a Question. Check Row : " +
        row +
        " In " +
        Sheettitle
    );
  }
  if (CorrectCount < 2 && QuestionData.IsMultiple) {
    return new Error(
      "Not Enough Correct Answer Count Question is Multiple Selection. Check Row : " +
        row +
        " In " +
        Sheettitle
    );
  }
  QuestionData["Answer"] = Answer;
  return QuestionData;
}

// Use For Arrange MCQ Quesiton
export function getSCENARIOQuestion(SheetData, row, Sheettitle) {
  let QuestionDataIndex = [1, 2, 3, 4, 5, 12, 14, 15, 16, 17, 18, 19];
  QuestionDataIndex.forEach(index => {
    if (getValue(SheetData, row, index) === null) {
      return new Error(
        "Empty Cell In QUESTION_POOL Sheet . Row : " +
          (row + 1) +
          " Col : " +
          (index + 1)
      );
    }
  });

  var QuestionData = {
    QuestionID: parseInt(getValue(SheetData, row, 0), 10),
    State: getValue(SheetData, row, 1),
    Topic: getValue(SheetData, row, 2),
    SimilarityID: getValue(SheetData, row, 3),
    ScenarioID: getValue(SheetData, row, 4),
    ProductVersions: getValue(SheetData, row, 5)
      .replace(/\s/g, "")
      .split(","),
    Question: getValue(SheetData, row, 6),
    NumberOfAnswer: parseInt(getValue(SheetData, row, 14), 10),
    IsMultiple: getValue(SheetData, row, 15) === "TRUE",
    IsSample: getValue(SheetData, row, 16) === "TRUE",
    CreatedBy: getValue(SheetData, row, 17),
    DateCreated: getValue(SheetData, row, 18),
    VerifiedBy: getValue(SheetData, row, 19),
    DateVerified: getValue(SheetData, row, 20),
    GoogleSheetID: "QUESTION_POOL!A" + (row + 1)
  };

  let Answer = [];
  let NumberOfAnswer = parseInt(getValue(SheetData, row, 13), 10);
  if (NumberOfAnswer < 2) {
    return new Error(
      "Atleast two answer required: " + row + " In " + Sheettitle
    );
  }
  var CorrectCount = 0;
  for (var AnswerIndex = 0; AnswerIndex < NumberOfAnswer; AnswerIndex++) {
    if (IsCorrect(SheetData, row, AnswerIndex, 7)) {
      CorrectCount += 1;
    }
    if (CorrectCount > 1) {
      if (!QuestionData.IsMultiple) {
        return new Error(
          "Single Selection Question Cannot be hold Multiple Answers. Row : " +
            row +
            " In " +
            Sheettitle
        );
      }
    }
    Answer[AnswerIndex] = {
      Answer: getValue(SheetData, row, 7 + AnswerIndex),
      Position: parseInt(getPosition(SheetData, row, AnswerIndex, 7), 10),
      IsCorrect: IsCorrect(SheetData, row, AnswerIndex, 7)
    };
  }
  if (CorrectCount < 1) {
    return new Error(
      "Atleast one answer should be in a Question. Check Row : " +
        row +
        " In " +
        Sheettitle
    );
  }
  if (CorrectCount < 2 && QuestionData.IsMultiple) {
    return new Error(
      "Not Enough Correct Answer Count Question is Multiple Selection. Check Row : " +
        row +
        " In " +
        Sheettitle
    );
  }
  QuestionData["Answer"] = Answer;
  return QuestionData;
}

// Use For Arrange PRACTICAL Quesiton
export function getPRACTICALQuestion(SheetData, row, Sheettitle) {
  let QuestionDataIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  QuestionDataIndex.forEach(index => {
    if (getValue(SheetData, row, index) === null) {
      return new Error(
        "Empty Cell In QUESTION_POOL Sheet . Row : " +
          (row + 1) +
          " Col : " +
          (index + 1)
      );
    }
  });

  var QuestionData = {
    QuestionID: parseInt(getValue(SheetData, row, 0), 10),
    State: getValue(SheetData, row, 1),
    Topic: getValue(SheetData, row, 2),
    SimilarityID: getValue(SheetData, row, 3),
    QuestionOrder: parseInt(getValue(SheetData, row, 4), 10),
    ProductVersions: getValue(SheetData, row, 5)
      .replace(/\s/g, "")
      .split(","),
    Question: getValue(SheetData, row, 6),
    IsSample: getValue(SheetData, row, 7) === "TRUE",
    CreatedBy: getValue(SheetData, row, 8),
    DateCreated: getValue(SheetData, row, 9),
    VerifiedBy: getValue(SheetData, row, 10),
    DateVerified: getValue(SheetData, row, 11),
    GoogleSheetID: "QUESTION_POOL!A" + (row + 1)
  };
  return QuestionData;
}

export function IsCorrect(sheetData, row, col, Offset) {
  if (
    sheetData[0].rowData[row].values[col + Offset].userEnteredFormat ===
      undefined ||
    sheetData[0].rowData[row].values[col + Offset].userEnteredFormat
      .textFormat === undefined ||
    sheetData[0].rowData[row].values[col + Offset].userEnteredFormat.textFormat
      .bold === undefined ||
    sheetData[0].rowData[row].values[col + Offset].userEnteredFormat.textFormat
      .bold === false
  ) {
    return false;
  }
  return sheetData[0].rowData[row].values[col + Offset].userEnteredFormat
    .textFormat.bold;
}
export function getPosition(sheetData, row, col, offset) {
  if (
    sheetData[0].rowData[row].values[col + offset].userEnteredFormat ===
      undefined ||
    sheetData[0].rowData[row].values[col + offset].userEnteredFormat
      .textFormat === undefined ||
    sheetData[0].rowData[row].values[col + offset].userEnteredFormat.textFormat
      .underline === undefined ||
    sheetData[0].rowData[row].values[col + offset].userEnteredFormat.textFormat
      .underline === false
  ) {
    return null;
  }

  return col + 1;
}

export function getTopics(CategoryData, CategoryName) {
  var CurrentTopicsList = [];
  CategoryData.forEach(CategoryEelement => {
    if (CategoryEelement.Category === CategoryName) {
      CurrentTopicsList = CategoryEelement.Topics;
      return CurrentTopicsList;
    }
  });
  return CurrentTopicsList;
}
