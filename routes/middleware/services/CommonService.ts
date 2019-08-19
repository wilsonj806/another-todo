import { responseObj, errorResponse } from "../../../types/server";

// Unit tests in "extra/commonService.spec.ts" for now

const responsifyData = (msg: string, data: any): responseObj => (
  {
    msg,
    data
  }
)

const responsifyNoData = (msg: string): responseObj => ({
  msg
})

const responsifyError = (msg: string, errors: any): errorResponse => ({
  msg,
  errors
})

const CommonService = Object.assign({
  responsifyData,
  responsifyNoData,
  responsifyError
});
export default CommonService;