import type { AsyncAPIDocumentData, OpenAPIDocumentData } from "apiuikit";

import rawStreetlight from "./streetlight.json";
import rawStreetlightKafka from "./streetlight-kafka.json";
import rawPetstore from "./openapi-petstore.json";
import rawKrakenWebsocket from "./kraken-websocket.json";
import rawTorture from "./torture.json";

// Bundled example specs, cast the same way apiuikit's own stories do
// (Operations.stories.tsx): `as unknown as <DocumentData>`, since a plain
// JSON import's inferred literal types don't structurally satisfy the
// document interfaces.
export const streetlight = rawStreetlight as unknown as AsyncAPIDocumentData;
export const streetlightKafka = rawStreetlightKafka as unknown as AsyncAPIDocumentData;
export const petstore = rawPetstore as unknown as OpenAPIDocumentData;

// A live, public WebSocket API (Kraken's market data feed, no auth). The
// WebSocket Try it panel only renders for `ws`/`wss` servers, so this is what
// lets readers connect for real instead of looking at a Kafka broker they
// can't reach.
export const krakenWebsocket = rawKrakenWebsocket as unknown as AsyncAPIDocumentData;

// Deliberately complex schemas (deep allOf/oneOf/$ref nesting) — used for
// the Schemas preview card so it demonstrates SchemaTree's real capability
// instead of a two-property payload. See components.schemas.CardPayment.
export const torture = rawTorture as unknown as AsyncAPIDocumentData;
