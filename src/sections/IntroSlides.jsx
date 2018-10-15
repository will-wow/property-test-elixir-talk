import React from "react";

import {
  S,
  Heading,
  Slide,
  SlideSet,
  CodePane,
  Text,
  List,
  ListItem,
  Image
} from "spectacle";

import NoteList from "../elements/NoteList";

import exampleAdditionExamples from "../code/exampleAdditionExamples.ex";
import exampleAdditionProperties from "../code/exampleAdditionProperties.ex";
import propertyAdditionCommutative from "../code/propertyAdditionCommutative.ex";

export default (
  <SlideSet>
    <Slide bgImage="" bgSize="contain" bgRepeat="no-repeat">
      <Heading
        size={2}
        caps
        lineHeight={1}
        textColor="tertiary"
        margin="1rem 0"
      >
        Making robots find edge cases
      </Heading>
      <Heading fit size={3} margin="1rem 0">
        Intro to Property-Based Testing with StreamData
      </Heading>
      <Text fit>
        Will Ockelmann-Wagner | @WowItsWillWow | wow@carbonfive.com
      </Text>

      <NoteList
        notes={[
          "intro stuff",
          "today I want to talk about my very favorite topic:",
          "making robots do my work for me",
          "specifically with property-based testing"
        ]}
      />
    </Slide>

    <Slide>
      <Heading fit size={1}>
        What is testing?
      </Heading>

      <NoteList notes={["What is testing?"]} />
    </Slide>

    <Slide>
      <Heading fit size={1}>
        What is testing?
      </Heading>

      <Text>
        Trying the happy path, then using your brain to come up with edge cases
      </Text>

      <NoteList
        notes={[
          "Automated testing, or even manual testing",
          "this is what it boils down to",
          "try the happy path, then think a little bit about possible bugs",
          "see if those cases work"
        ]}
      />
    </Slide>

    <Slide>
      <Heading fit size={1}>
        Example-Based Testing
      </Heading>

      <Text>Specifically, you come up with one example of each case</Text>

      <NoteList
        notes={[
          "And more specifically, you usually come up with exactly one example of each case",
          "Here's normal data, here's data that's weird in one way, there's data that's weird in another way",
          "called example-based testing"
        ]}
      />
    </Slide>

    <Slide>
      <Heading fit size={2}>
        Example-Based Testing
      </Heading>

      <CodePane
        textSize="2rem"
        lang="elixir"
        source={exampleAdditionExamples}
      />

      <NoteList
        notes={[
          "if we were testing to make super sure addition worked",
          "try small numbers, try big numbers",
          "even try the 'zero' edge case",
          "feels pretty solid",
          "but we want to go deeper",
          "what else could we test about addition?"
        ]}
      />
    </Slide>

    <Slide>
      <Heading fit size={2} textColor="tertiary">
        Properties of Addition
      </Heading>

      <List>
        <ListItem>
          Commutative: <S type="bold">a + b == b + a</S>
        </ListItem>
        <ListItem>
          Associative: <S type="bold">(a + b) + c == a + (b + c)</S>
        </ListItem>
        <ListItem>
          Identity: <S type="bold">a + 0 == a</S>
        </ListItem>
      </List>

      <NoteList
        notes={[
          "something I half-remember from HS math is addition has properties",
          "after a quick Google, here they are",
          "addition has the commutative (), associative (), and identity () properties",
          "if + does what it's supposed to, all these will ALWAYS hold true"
        ]}
      />
    </Slide>

    <Slide>
      <Heading fit size={2}>
        Example-Based Properties
      </Heading>

      <CodePane
        textSize="2rem"
        lang="elixir"
        source={exampleAdditionProperties}
      />

      <NoteList
        notes={[
          "And here they are, example-based tests for the properties",
          "so now addition DEFINITELY works in Elixir",
          "but what about floats? Is plus going to crash on 1.5?",
          "in this case, no, BUT"
        ]}
      />
    </Slide>

    <Slide>
      <Heading fit size={1}>
        Unknown Unknowns
      </Heading>

      <Text>You can&rsquo;t test for what you don&rsquo;t think of</Text>

      <NoteList
        notes={[
          "the general problem is unknown unknowns",
          "you use your brain to think of edge cases while writing tests",
          "use the same brain while implementing",
          "things you don't think of never get caught",
          "also a tension when writing tests between completeness and being obvious and bored",
          "all of which is to say:"
        ]}
      />
    </Slide>

    <Slide>
      <Heading fit size={2}>
        Make a robot do it!
      </Heading>

      <Image src="./img/robot-hockey.gif" />

      <NoteList notes={["Man we are so screwed"]} />
    </Slide>

    <Slide>
      <Heading fit size={1}>
        Property-Based Testing
      </Heading>

      <Heading fit size={2}>
        Automated corner case detection
      </Heading>

      <List>
        <ListItem>Generate arbitrary inputs</ListItem>
        <ListItem>Run the test many times</ListItem>
        <ListItem>It should always pass</ListItem>
      </List>

      <NoteList notes={["Seriously though"]} />
    </Slide>

    <Slide>
      <Heading size={3} textColor="tertiary">
        Most Languages have Property Testing
      </Heading>

      <List>
        <ListItem>JS: JsVerify</ListItem>
        <ListItem>Haskell: QuickCheck</ListItem>
        <ListItem>Python: Hypothesis</ListItem>
        <ListItem>Elixir: StreamData</ListItem>
      </List>

      <NoteList
        notes={[
          "Comes from Haskell, but implemented in most languages",
          "today we're talking about StreamData"
        ]}
      />
    </Slide>

    <Slide>
      <Heading fit size={2}>
        Property-Based Testing Addition
      </Heading>

      <CodePane
        textSize="2rem"
        lang="elixir"
        source={propertyAdditionCommutative}
      />

      <NoteList
        notes={[
          "same test of the commutative property",
          "example test at top, property test on bottom",
          "break this down a little",
          "property function is like test",
          "check all is a macro combo imported from use ExUnitProperties",
          "generate a couple numbers",
          "assert property holds true in all cases, not just one",
          "will try 0, 1 million, negative 0.0001, etc",
          "note this works inside a normal ex_unit file"
        ]}
      />
    </Slide>

    <Slide>
      <Heading fit size={2}>
        Find a property that always holds
      </Heading>

      <Heading fit size={3} textColor="tertiary">
        Test the heck out of it
      </Heading>

      <NoteList notes={["in other words..."]} />
    </Slide>

    <Slide bgImage="./img/test-all.jpg" bgSize="contain" bgRepeat="no-repeat" />

    <Slide>
      <Heading size={2} fit>
        But I write web apps
      </Heading>
      <Heading size={2} fit>
        not mathematical operators
      </Heading>

      <NoteList
        notes={[
          "this is cool, but does it work in the real world?",
          "web apps don't have properties written in textbook"
        ]}
      />
    </Slide>
  </SlideSet>
);
