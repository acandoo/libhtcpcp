export const OK = 200
export const METHOD_NOT_ALLOWED = 405
export const UNSUPPORTED_MEDIA_TYPE = 415

/**
 * This error code is for TEA-capable pots only.
 *
 * As per {@link https://datatracker.ietf.org/doc/html/rfc7168|RFC 7168}:
 *
 * A BREW request to the "/" URI, as defined in Section 2.1.1, will return an
 * Alternates header indicating the URIs of the available varieties of tea to
 * brew. It is RECOMMENDED that this response be served with a status code of
 * 300, to indicate that brewing has not commenced and further options must be
 * chosen by the client.
 */
export const MULTIPLE_OPTIONS = 300

/**
 * This error code is for TEA-capable pots only.
 *
 * As per {@link https://datatracker.ietf.org/doc/html/rfc7168|RFC 7168}:
 *
 * Services that implement the Accept-Additions header field MAY return a 403
 * status code for a BREW request of a given variety of tea, if the service
 * deems the combination of additions requested to be contrary to the
 * sensibilities of a consensus of drinkers regarding the variety in question.
 */
export const FORBIDDEN = 403

/**
 * As per {@link https://datatracker.ietf.org/doc/html/rfc2324|RFC 2324}:
 *
 * This response code MAY be returned if the operator of the coffee pot cannot
 * comply with the Accept-Addition request. Unless the request was a HEAD
 * request, the response SHOULD include an entity containing a list of available
 * coffee additions.
 */
export const NOT_ACCEPTABLE = 406

/**
 * As per {@link https://datatracker.ietf.org/doc/html/rfc2324|RFC 2324}:
 *
 * Any attempt to brew coffee with a teapot should result in the error code "418
 * I'm a teapot". The resulting entity body MAY be short and stout.
 */
export const IM_A_TEAPOT = 418

/**
 * This error code is for TEA-capable pots only.
 *
 * As per {@link https://datatracker.ietf.org/doc/html/rfc7168|RFC 7168}:
 *
 * TEA-capable pots that are not provisioned to brew coffee may return either a
 * status code of 503, indicating temporary unavailability of coffee, or a code
 * of 418 as defined in the base HTCPCP specification to denote a more permanent
 * indication that the pot is a teapot.
 */
export const COFFEE_UNAVAILABLE = 503
