<%#
 Copyright 2013-2017 the original author or authors from the JHipster project.

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
package <%=packageName%>.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Properties for UAA.
 */
@Component
@ConfigurationProperties(prefix = "uaa", ignoreUnknownFields = false)
public class UaaProperties {
    private KeyStore keyStore = new KeyStore();

    public KeyStore getKeyStore() {
        return keyStore;
    }

    /**
     * Keystore configuration for signing and verifying JWT tokens.
     */
    public static class KeyStore {
        //name of the keystore in the classpath
        private String name = "keystore.jks";
        //password used to access the key
        private String password = "password";
        //name of the alias to fetch
        private String alias = "selfsigned";

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getAlias() {
            return alias;
        }

        public void setAlias(String alias) {
            this.alias = alias;
        }
    }
}
