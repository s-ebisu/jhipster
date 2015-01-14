package <%=packageName%>.domain;
<% if (relationships.length > 0  && (fieldsContainOwnerManyToMany == false || fieldsContainOneToMany == true)) { %>
import com.fasterxml.jackson.annotation.JsonIgnore;<% } %><% if (fieldsContainCustomTime == true) { %>
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;<% } %><% if (fieldsContainLocalDate == true) { %>
import <%=packageName%>.domain.util.CustomLocalDateSerializer;
import <%=packageName%>.domain.util.ISO8601LocalDateDeserializer;<% } %><% if (fieldsContainDateTime == true) { %>
import <%=packageName%>.domain.util.CustomDateTimeDeserializer;
import <%=packageName%>.domain.util.CustomDateTimeSerializer;<% } %><% if (hibernateCache != 'no') { %>
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;<% } %><% if (fieldsContainCustomTime == true && databaseType == 'sql') { %>
import org.hibernate.annotations.Type;<% } %><% if (fieldsContainLocalDate == true) { %>
import org.joda.time.LocalDate;<% } %><% if (fieldsContainDateTime == true) { %>
import org.joda.time.DateTime;<% } %><% if (databaseType == 'nosql') { %>
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;<% } %>
<% if (databaseType == 'sql') { %>
import javax.persistence.*;<% } %>
import java.io.Serializable;<% if (fieldsContainBigDecimal == true) { %>
import java.math.BigDecimal;<% } %><% if (relationships.length > 0) { %>
import java.util.HashSet;
import java.util.Set;<% } %>

/**
 * A <%= entityClass %>.
 */<% if (databaseType == 'sql') { %>
@Entity<% if (entityIsRootTable == true) { %>
@Table(name = "T_<%= name.toUpperCase() %>")<% } %><% } %><% if (hibernateCache != 'no' && databaseType == 'sql') { %>
<% if (inheritanceFor == true) { %>@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type")<% } %>
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)<% } %><% if (databaseType == 'nosql') { %>
@Document(collection = "T_<%= name.toUpperCase() %>")<% } %>
public class <%= entityClass %><% if (inheritanceFromClass != '') { %> extends <%= inheritanceFromClass %><% } %> implements Serializable {

    <% if (entityIsRootTable == true) { %>@Id<% if (databaseType == 'sql') { %>
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;<% } %><% if (databaseType == 'nosql') { %>
    private String id;<% } %><% } %>
<% for (fieldId in fields) { %><% if (databaseType == 'sql') { %><% if (fields[fieldId].fieldType == 'DateTime') { %>
    @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    @JsonSerialize(using = CustomDateTimeSerializer.class)
    @JsonDeserialize(using = CustomDateTimeDeserializer.class)
    @Column(name = "<%=fields[fieldId].fieldNameUnderscored %>", nullable = false)<% } else if (fields[fieldId].fieldType == 'LocalDate') { %>
    @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentLocalDate")
    @JsonSerialize(using = CustomLocalDateSerializer.class)
    @JsonDeserialize(using = ISO8601LocalDateDeserializer.class)
    @Column(name = "<%=fields[fieldId].fieldNameUnderscored %>", nullable = false)<% } else if (fields[fieldId].fieldType == 'BigDecimal') { %>
    @Column(name = "<%=fields[fieldId].fieldNameUnderscored %>", precision=10, scale=2)<% } else { %>
    @Column(name = "<%=fields[fieldId].fieldNameUnderscored %>")<% }} %><% if (databaseType == 'nosql') { %><% if (fields[fieldId].fieldType == 'DateTime') { %>
    @JsonSerialize(using = CustomDateTimeSerializer.class)
    @JsonDeserialize(using = CustomDateTimeDeserializer.class)<% } else if (fields[fieldId].fieldType == 'LocalDate') { %>
    @JsonSerialize(using = CustomLocalDateSerializer.class)
    @JsonDeserialize(using = ISO8601LocalDateDeserializer.class)<% } %>
    @Field("<%=fields[fieldId].fieldNameUnderscored %>")<% } %>
    private <%= fields[fieldId].fieldType %> <%= fields[fieldId].fieldName %>;
<% } %><% for (relationshipId in relationships) { %><% if (relationships[relationshipId].relationshipType == 'one-to-many') { %>
    @OneToMany(mappedBy = "<%= entityInstance %>")
    @JsonIgnore<% if (hibernateCache != 'no') { %>
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)<% } %>
    private Set<<%= relationships[relationshipId].otherEntityNameCapitalized %>> <%= relationships[relationshipId].otherEntityName %>s = new HashSet<>();<% } else if (relationships[relationshipId].relationshipType == 'many-to-one') { %>
    @ManyToOne
    private <%= relationships[relationshipId].otherEntityNameCapitalized %> <%= relationships[relationshipId].otherEntityName %>;<% } else if (relationships[relationshipId].relationshipType == 'many-to-many') { %>
    @ManyToMany<% if (relationships[relationshipId].ownerSide == false) { %>(mappedBy = "<%= entityInstance %>s")
    @JsonIgnore<% } %><% if (hibernateCache != 'no') { %>
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)<% } %>
    private Set<<%= relationships[relationshipId].otherEntityNameCapitalized %>> <%= relationships[relationshipId].otherEntityName %>s = new HashSet<>();<% } else { %>
    @OneToOne<% if (relationships[relationshipId].ownerSide == false) { %>(mappedBy = "<%= entityInstance %>")<% } %>
    private <%= relationships[relationshipId].otherEntityNameCapitalized %> <%= relationships[relationshipId].otherEntityName %>;<% } %>
<% } %>
    <% if (entityIsRootTable == true) { %>public <% if (databaseType == 'sql') { %>Long<% } %><% if (databaseType == 'nosql') { %>String<% } %> getId() {
        return id;
    }

    public void setId(<% if (databaseType == 'sql') { %>Long<% } %><% if (databaseType == 'nosql') { %>String<% } %> id) {
        this.id = id;
    }
    <% } %>
<% for (fieldId in fields) { %>
    public <%= fields[fieldId].fieldType %> get<%= fields[fieldId].fieldNameCapitalized %>() {
        return <%= fields[fieldId].fieldName %>;
    }

    public void set<%= fields[fieldId].fieldNameCapitalized %>(<%= fields[fieldId].fieldType %> <%= fields[fieldId].fieldName %>) {
        this.<%= fields[fieldId].fieldName %> = <%= fields[fieldId].fieldName %>;
    }
<% } %><% for (relationshipId in relationships) { %><% if (relationships[relationshipId].relationshipType == 'one-to-many' || relationships[relationshipId].relationshipType == 'many-to-many') { %>
    public Set<<%= relationships[relationshipId].otherEntityNameCapitalized %>> get<%= relationships[relationshipId].otherEntityNameCapitalized %>s() {
        return <%= relationships[relationshipId].otherEntityName %>s;
    }

    public void set<%= relationships[relationshipId].otherEntityNameCapitalized %>s(Set<<%= relationships[relationshipId].otherEntityNameCapitalized %>> <%= relationships[relationshipId].otherEntityName %>s) {
        this.<%= relationships[relationshipId].otherEntityName %>s = <%= relationships[relationshipId].otherEntityName %>s;
    }<% } else { %>
    public <%= relationships[relationshipId].otherEntityNameCapitalized %> get<%= relationships[relationshipId].otherEntityNameCapitalized %>() {
        return <%= relationships[relationshipId].otherEntityName %>;
    }

    public void set<%= relationships[relationshipId].otherEntityNameCapitalized %>(<%= relationships[relationshipId].otherEntityNameCapitalized %> <%= relationships[relationshipId].otherEntityName %>) {
        this.<%= relationships[relationshipId].otherEntityName %> = <%= relationships[relationshipId].otherEntityName %>;
    }<% } %>
<% } %>
    <% if (entityIsRootTable == true || databaseType != 'sql') { %>@Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        <%= entityClass %> <%= entityInstance %> = (<%= entityClass %>) o;

        if (id != null ? !id.equals(<%= entityInstance %>.getId()) : <%= entityInstance %>.getId() != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
    	final int prime = 31;
		int result = 1;
		result = prime
				* result
				+ ((getClass() == null) ? 0 : getClass().hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
    }

    @Override
    public String toString() {
        return "<%= entityClass %>{" +
                "id=" + id +<% for (fieldId in fields) { %>
                ", <%= fields[fieldId].fieldName %>='" + <%= fields[fieldId].fieldName %> + "'" +<% } %>
                '}';
    }<% } %>
}
