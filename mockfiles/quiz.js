var quiz1 = {quizTitle: "The nazi quiz",
  questions:
     [

    {question:"Who was the leader of the nazis?",
      _id:1,
      comment:"Of course it was Hitler",
      correctAnswer:1,
      alternatives:[{alternativeName:"Hitler",
                    alternativeNumber:1},

                    {alternativeName:"Stalin",
                    alternativeNumber:2},

                    {alternativeName:"Göring",
                    alternativeNumber:3},

                    {alternativeName:"Hemmingway",
                    alternativeNumber:4},
    ]}
  ],

  {question:"When did hitller die?",
    _id:2,
    comment:"1945. He probably commited suicide",
    correctAnswer:3,
    alternatives:[{alternativeName:"1943",
                  alternativeNumber:1},

                  {alternativeName:"2002",
                  alternativeNumber:2},

                  {alternativeName:"1945",
                  alternativeNumber:3},

                  {alternativeName:"1910",
                  alternativeNumber:4},
  ]}


};


module.exports= quiz1;
