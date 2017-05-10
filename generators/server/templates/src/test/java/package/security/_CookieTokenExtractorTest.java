<%#
 Copyright 2013-2017 the original author or authors.

 This file is part of the JHipster project, see https://jhipster.github.io/
 for more information.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-%>
package <%=packageName%>.security;

import <%=packageName%>.security.uaa.CookieTokenExtractor;
import com.mycompany.myapp.security.uaa.CookieTokenExtractor;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.common.OAuth2AccessToken;

import javax.ws.rs.HttpMethod;

/**
 * Test whether the CookieTokenExtractor can properly extract access tokens from
 * Cookies and Headers.
 */
public class CookieTokenExtractorTest {
    private CookieTokenExtractor cookieTokenExtractor;

    @Before
    public void init() {
        cookieTokenExtractor = new CookieTokenExtractor();
    }

    @Test
    public void testExtractTokenCookie() {
        MockHttpServletRequest request = UaaAuthenticationServiceTest.createMockHttpServletRequest();
        Authentication authentication = cookieTokenExtractor.extract(request);
        Assert.assertEquals(UaaAuthenticationServiceTest.ACCESS_TOKEN_VALUE, authentication.getPrincipal().toString());
    }

    @Test
    public void testExtractTokenHeader() {
        MockHttpServletRequest request = new MockHttpServletRequest(HttpMethod.GET, "http://www.test.com");
        request.addHeader("Authorization", OAuth2AccessToken.BEARER_TYPE + " " + UaaAuthenticationServiceTest.ACCESS_TOKEN_VALUE);
        Authentication authentication = cookieTokenExtractor.extract(request);
        Assert.assertEquals(UaaAuthenticationServiceTest.ACCESS_TOKEN_VALUE, authentication.getPrincipal().toString());
    }

    @Test
    public void testExtractTokenParam() {
        MockHttpServletRequest request = new MockHttpServletRequest(HttpMethod.GET, "http://www.test.com");
        request.addParameter(OAuth2AccessToken.ACCESS_TOKEN, UaaAuthenticationServiceTest.ACCESS_TOKEN_VALUE);
        Authentication authentication = cookieTokenExtractor.extract(request);
        Assert.assertEquals(UaaAuthenticationServiceTest.ACCESS_TOKEN_VALUE, authentication.getPrincipal().toString());
    }
}
