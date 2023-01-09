import express from "express";
import cors from "cors";
import "./connection.js";
import {Comment} from "./modal.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/comments/search", async (req, res) => {
  try {
    /*
  These stages are called "pipeline stages" because they are executed in a sequence, with the output of one stage being passed as input to the next stage.
  
  For example, we can use the $match stage to filter the documents based on certain criteria, followed by the $project stage to select the desired fields and perform calculations, and finally the $sort stage to sort the results. This sequence of stages forms a pipeline that can be executed using the aggregate() method.
  */

    // PIPELINES
    // search pipeline
    const search = {
      $search: {
        autocomplete: {
          query: `${req.query.query}`,
          path: "name",
          fuzzy: {
            maxEdits: 2,
            prefixLength: 3,
          },
        },
      },
    };
    // Limit pipeline
    const limit = {
      $limit: 5,
    };

    // Project pipeline
    // Project pipeline specifies the fields to be included in the result.
    const project = {
      $project: {
        name: 1,
        score: { $meta: "searchScore" },
      },
    };

    // Sort pipeline
    const sort = {
      $sort: {
        score: { $meta: "textScore" },
      },
    };

    // Aggregate method execute the pipeline
    const result = await Comment.aggregate([
      search,
      project,
      sort,
      limit,
    ]).exec();
    console.log(req.query.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(5000, () => {
  console.log("API server started on port 5000");
});
