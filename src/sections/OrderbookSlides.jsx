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

import orderBookTypes from "../code/orderBookTypes.ts";
import generatorOrder from "../code/generatorOrder.js";
import generatorPositiveNumber from "../code/generatorPositiveNumber.js";
import generatorOrderBook from "../code/generatorOrderBook.js";
import exampleBestPrice from "../code/exampleBestPrice.js";
import propertyBestPriceSetup from "../code/propertyBestPriceSetup";
import propertyBestPriceBody from "../code/propertyBestPriceBody";
import propertyTestError from "../code/propertyTestError.txt";
import propertyTestPassing from "../code/propertyTestPassing.txt";
import orderSampler from "../code/orderSampler.js";

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
          "not actual code or even language",
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

      <CodePane textSize="2.5rem" lang="javascript" source={orderBookTypes} />

      <NoteList
        notes={[
          "no getting away from types",
          "comes from haskell-land",
          "if no type system, still have to think about shape of structures",
          "in this simple orderbook:",
          "order can be buy or sell",
          "it has an id, a user, a price, and a quantity to or sell at that price",
          "an orderbook is a list of buys and sells",
          "JsVerify works great with TS, but we'll stick with JS for the rest of the talk"
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
      <Heading size={2} fit>
        Arbitrary Order Generator
      </Heading>

      <CodePane textSize="2.25rem" lang="javascript" source={generatorOrder} />

      <NoteList
        notes={[
          "jsc.record lets you generate objects with a shape",
          "most custom generators are mix of primitives and custom"
        ]}
      />
    </Slide>

    <Slide>
      <Heading size={1}>Important note</Heading>
      <Heading size={3}>jsc.record() returns a generator,</Heading>
      <Heading size={3}>not a value</Heading>

      <NoteList notes={[]} />
    </Slide>

    <Slide>
      <Heading size={2} fit>
        arbitraryOrder is not an Order
      </Heading>

      <CodePane textSize="2.25rem" lang="javascript" source={generatorOrder} />

      <NoteList
        notes={[
          "so arbitraryOrder isn't an order, its an object that JsVerify uses in a test to generate Orders later",
          "can take a while to grok",
          "ok with that out of the way"
        ]}
      />
    </Slide>

    <Slide>
      <Heading size={2}>Positive Numbers</Heading>

      <CodePane
        textSize="2rem"
        lang="javascript"
        source={generatorPositiveNumber}
      />

      <NoteList
        notes={[
          "jsverify only gives us primitive number, which could be positive or negative",
          "Details aren't important now",
          "you can use smap to apply a mapping function to each generated value",
          "so Math.abs makes generated numbers always positive",
          "suchthat lets you filter out certain values",
          "price can't be zero",
          "overuse filter makes test slower",
          "better to Math.abs instead of < 0 filter"
        ]}
      />
    </Slide>

    <Slide>
      <Heading fit size={2}>
        Arbitrary OrderBooks
      </Heading>

      <CodePane
        textSize="2.25rem"
        lang="javascript"
        source={generatorOrderBook}
      />

      <NoteList
        notes={[
          "Finally, use our complicated order type to make arbitrary lists of orders"
        ]}
      />
    </Slide>

    <Slide>
      <Heading fit size={2}>
        Example-Based Test:
      </Heading>

      <CodePane textSize="2rem" lang="javascript" source={exampleBestPrice} />

      <NoteList
        notes={[
          "Here's the example-based test you might write without property testing",
          "make an orderbook with low and high prices, and check that the best sell for a buyer is the cheapest, and the best buy for a seller is the most expensive",
          "if this passes, could see calling it a day, BUT"
        ]}
      />
    </Slide>

    <Slide>
      <Heading fit size={2}>
        Property-Based Test Setup
      </Heading>

      <CodePane
        textSize="2.25rem"
        lang="javascript"
        source={propertyBestPriceSetup}
      />

      <NoteList notes={["the setup code", "generate arbitrary orderbook"]} />
    </Slide>

    <Slide>
      <Heading fit size={2}>
        Property-Based Test Body
      </Heading>

      <CodePane
        textSize="2.25rem"
        lang="javascript"
        source={propertyBestPriceBody}
      />

      <NoteList
        notes={[
          "the body",
          "get the best price from arbitrary orderbook for the type",
          "check that FOR EVERY sell order in the orderbook, the price is as good or worse",
          "run similar test for buy orders",
          "not as mathematical, but valid property",
          "annoying implementation detail: return true b/c expect throw error"
        ]}
      />
    </Slide>

    <Slide>
      <Heading size={2}>Failing Test!</Heading>

      <CodePane
        textSize="1.75rem"
        lang="javascript"
        source={propertyTestError}
      />

      <NoteList
        notes={[
          "Oops! Even though example test passed, this one is failing",
          "it tells us the sample data passed in",
          "the second sell order is lower than the first one",
          "in example the first was lower",
          "bug example didn't catch - picks the first value instead of the lowest",
          "this is a really good counterexample",
          "note there zero buy orders, only two sell orders"
        ]}
      />
    </Slide>

    <Slide>
      <Heading fit size={1}>
        Arbitrary is not{" "}
        <S type="bold" textColor="black">
          (quite)
        </S>{" "}
        random
      </Heading>

      <List>
        <ListItem>
          Arbitrary data is generated from a{" "}
          <S type="bold">complexity number</S>
        </ListItem>
        <ListItem>
          Inputs start out less complex, and become more complex
        </ListItem>
        <ListItem>
          Test returns <S type="bold">least complex</S> possible failing test
        </ListItem>
      </List>

      <NoteList notes={["why a generator is different than factory bot"]} />
    </Slide>

    <Slide>
      <Heading fit size={1}>
        Low-Complexity Values:
      </Heading>

      <List>
        <ListItem>
          <S type="bold">number</S>: 1 and 0
        </ListItem>
        <ListItem>
          <S type="bold">list</S>: []
        </ListItem>
        <ListItem>
          <S type="bold">string</S>: &quot;&quot; and &quot;a&quot;
        </ListItem>
      </List>

      <NoteList
        notes={[
          "low complexity primitives look like:",
          "low complexity records are made up of"
        ]}
      />
    </Slide>

    <Slide>
      <Heading size={2}>Passing Test</Heading>

      <CodePane
        textSize="2.25rem"
        lang="javascript"
        source={propertyTestPassing}
      />

      <NoteList
        notes={[
          "Given that nice counter example",
          "fix implementation",
          "tests passing"
        ]}
      />
    </Slide>

    <Slide>
      <Heading size={2} textColor="tertiary">
        That&rsquo;s Property-Based Testing!
      </Heading>

      <List>
        <ListItem>Thinking of properties can feel hard</ListItem>
        <ListItem>But not that different from what you already do</ListItem>
        <ListItem>
          You already think of examples to demonstrate a property
        </ListItem>
        <ListItem>Just skip the example part!</ListItem>
      </List>

      <NoteList notes={["that's pretty much it for property testing"]} />
    </Slide>

    <Slide>
      <Heading size={2} fit>
        Arbitrary data outside of property tests
      </Heading>

      <CodePane textSize="2.25rem" lang="javascript" source={orderSampler} />

      <NoteList
        notes={[
          "one last tip",
          "jsc.sampler lets you use arbitrary generators in your normal unit tests too",
          "a little helper to make overriding easier",
          "no need for a second faker library"
        ]}
      />
    </Slide>

    <Slide>
      <Heading size={1} fit>
        Supplement, Not Replacement
      </Heading>

      <List>
        <ListItem>Slower than example tests</ListItem>
        <ListItem>Not as good documentation</ListItem>
        <ListItem>Hard to come up with properties</ListItem>
      </List>

      <NoteList
        notes={[
          "Last note",
          "slower b/c many iterations",
          "example test is clearer documentation of how to use api for new dev",
          "not always easy to come up with a general property",
          "in real world use property test for important or easy to test stuff"
        ]}
      />
    </Slide>

    <Slide>
      <Heading size={1}>Moral of the story?</Heading>
    </Slide>

    <Slide>
      <Heading size={1}>Don&rsquo;t think for yourself</Heading>
    </Slide>

    <Slide>
      <Heading size={1}>Don&rsquo;t think for yourself</Heading>
      <Heading size={1} textColor="black" fit>
        (robots are better at it)
      </Heading>
    </Slide>
  </SlideSet>
);
