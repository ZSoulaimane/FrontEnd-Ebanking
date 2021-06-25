import { Quotes } from './quotes';

export class RateResponse {
  meta: {
    effective_params: {
      data_set: string;
      base_currencies: string[];
      quote_currencies: string[];
    };
    endpoint: string;
    request_time: Date;
    skipped_currency_pairs: string[];
  };
  quotes: Quotes[];
}
