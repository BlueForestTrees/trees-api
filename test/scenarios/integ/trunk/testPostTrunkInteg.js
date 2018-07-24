import {postBadColorTrunkSpec, postBadGrandeurTrunkSpec, postBadIdTrunkSpec, postTransportTrunkSpec, postTrunkSpec} from "../../../spec/trunk/testPostTrunkSpec";
import {init, withTest} from "trees-test/dist/api";
import api from "../../../../src";
import ENV from "../../../../src/env";
import {cols} from "../../../../src/const/collections";

describe('POST Trunks', function () {

    beforeEach(init(api, ENV, cols));

    it('create the trunk', withTest(postTrunkSpec));

    it('refuse to create a trunk with bad id', withTest(postBadIdTrunkSpec));

    it('create a transport trunk', withTest(postTransportTrunkSpec));

    it('refuse to create a trunk with color error', withTest(postBadColorTrunkSpec));

});