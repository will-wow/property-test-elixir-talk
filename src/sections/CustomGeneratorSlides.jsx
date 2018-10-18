import React from "react";

import {
  Text,
  Heading,
  Slide,
  SlideSet,
  CodePane,
  List,
  ListItem,
  S
} from "spectacle";

import NoteList from "../elements/NoteList";

import orderBookTypes from "../code/orderBookTypes.ex";
import generatorOrder from "../code/generatorOrder.ex";
import generatorOrderBook from "../code/generatorOrderBook.ex";
import numberGenerator from "../code/numberGenerator.ex";
import numberGeneratorFilter from "../code/numberGeneratorFilter.ex";
import idGenerator from "../code/idGenerator.ex";
import idGeneratorLength from "../code/idGeneratorLength.ex";
import filterError from "../code/filterError.txt";
import exampleOrders from "../code/exampleOrders.ex";

export default (
  <SlideSet>
    <Slide>
      <Heading fit size={1}>
        Deeper Dive
      </Heading>

      <NoteList
        notes={[
          "To see how property testing works in real world",
          "look at an example based on real",
          "not actual code",
          "doing something similar, using property testing"
        ]}
      />
    </Slide>

    <Slide>
      <Heading fit size={1}>
        Tangent: Limit Order Books
      </Heading>

      <List>
        <ListItem>For asset trading, like stock market</ListItem>
        <ListItem>Orders placed with a Limit Price</ListItem>
        <ListItem>When an order comes in: </ListItem>
        <ListItem>give them the best available price</ListItem>
      </List>

      <NoteList notes={["explain orderbooks"]} />
    </Slide>
    <Slide>
      <Heading fit size={2}>
        Types: Limit Order Books
      </Heading>

      <CodePane textSize="2.5rem" lang="elixir" source={orderBookTypes} />

      <NoteList
        notes={[
          "no getting away from types",
          "comes from haskell-land",
          "elixir structs mean thinking types already",
          "conceptually a little easier with typed keys",
          "in this simple orderbook:",
          "order can be buy or sell",
          "order has an id, a user, a price, and a quantity to or sell at that price",
          "an orderbook is a list of buys and sells"
        ]}
      />
    </Slide>
    <Slide>
      <Heading fit size={1}>
        Custom Arbitrary Data Generators
      </Heading>

      <Text>The other half of property testing</Text>

      <NoteList
        notes={[
          "we've seen a property test that generates arbitrary primitives",
          "to generate arbitrary Orders",
          "we need custom data generators"
        ]}
      />
    </Slide>
    <Slide>
      <Heading size={2}>Start simple</Heading>

      <CodePane textSize="2.5rem" lang="elixir" source={orderBookTypes} />

      <NoteList
        notes={[
          "To generate an order, have to generate an id",
          "in this case ID is a string"
        ]}
      />
    </Slide>
    <Slide>
      <Heading size={2}>String Generator</Heading>

      <CodePane textSize="2.5rem" lang="elixir" source={idGenerator} />

      <NoteList
        notes={[
          "Easy enough",
          "streamData.string",
          "any ascii, i don't care",
          "StreamData returns a Stream",
          "good name",
          "so take 10",
          "important note: generator doesn't return a value",
          "see it gets more complicated",
          "starts with simple like empty and 1 letter",
          "then more complicated - longer, symbols and numbers",
          "repeats to make sure you can handle them",
          "that caught a good bug for me once",
          "but wait - IDs can't be blank"
        ]}
      />
    </Slide>
    <Slide>
      <Heading size={2} fit>
        Non-Empty String Generator
      </Heading>

      <CodePane textSize="2.5rem" lang="elixir" source={idGeneratorLength} />

      <NoteList
        notes={[
          "pass a min length",
          "much better",
          "think about if you should handle empties or not",
          "invarients"
        ]}
      />
    </Slide>
    <Slide>
      <Heading size={2} fit>
        Non-Negative Price Generator
      </Heading>

      <CodePane textSize="2.5rem" lang="elixir" source={numberGenerator} />

      <NoteList
        notes={[
          "okay, price should be easy",
          "we already know to use min",
          "but wait - that second value is zero",
          "min is inclusive, and price can't be zero"
        ]}
      />
    </Slide>
    <Slide>
      <Heading size={2} fit>
        Positive Price Generator
      </Heading>

      <CodePane
        textSize="2.5rem"
        lang="elixir"
        source={numberGeneratorFilter}
      />

      <NoteList
        notes={[
          "for this kind of edge case, filters",
          "if a generated value fails, do it again",
          "no more zeros"
        ]}
      />
    </Slide>

    <Slide>
      <Heading size={2} fit>
        FilterTooNarrowError
      </Heading>

      <CodePane textSize="2.5rem" source={filterError} />

      <NoteList
        notes={[
          "caveat: don't be too narrow",
          "if more than a few values are filtered, wasteful",
          "test will fail",
          "that's why we used min 0 instead of just filtering"
        ]}
      />
    </Slide>

    <Slide>
      <Heading size={2} fit>
        Arbitrary Order Generator
      </Heading>

      <CodePane textSize="1.75rem" lang="elixir" source={generatorOrder} />

      <NoteList
        notes={[
          "So with all that set up, we can build a real order",
          "gen all is a helper syntax like check all from property",
          "lets you use multiple generators",
          "returns another generator",
          "generates some ids and numbers, uses them to make an order"
        ]}
      />
    </Slide>

    <Slide>
      <Heading size={2} fit>
        Sample Arbitrary Orders
      </Heading>

      <CodePane textSize="2rem" lang="elixir" source={exampleOrders} />

      <NoteList
        notes={[
          "Here are a couple generated orders",
          "the first one has simple values",
          "later they get more complicated",
          "if we had a bug with large or high precision, this would catch"
        ]}
      />
    </Slide>

    <Slide>
      <Heading fit size={2}>
        Arbitrary OrderBooks
      </Heading>

      <CodePane textSize="2rem" lang="elixir" source={generatorOrderBook} />

      <NoteList
        notes={[
          "Finally, use our complicated order type to make arbitrary lists of orders",
          "so it generates small to long lists of arbitrary orders",
          "hard to show on a slide, you get the idea"
        ]}
      />
    </Slide>
  </SlideSet>
);
