import jwtDecode from "jwt-decode"

interface JWTProps {
  organization: {
    slug: string
    id: string
  }
  application: {
    kind: string
  }
  test: boolean
}

export const getInfoFromJwt = (accessToken: string) => {
  try {
    const {
      organization: { slug },
      application: { kind },
      test,
    } = jwtDecode(accessToken) as JWTProps

    return { slug, kind, isTest: test }
  } catch (e) {
    return {}
  }
}
