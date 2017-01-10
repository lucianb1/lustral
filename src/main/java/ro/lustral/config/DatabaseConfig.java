package ro.lustral.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import javax.sql.DataSource;

@Configuration
@ConfigurationProperties(prefix = "params.datasource")
public class DatabaseConfig extends HikariConfig {

	@Bean(destroyMethod = "close")
	public DataSource dataSource() {
		return new HikariDataSource(this);
	}

	@Bean
	public NamedParameterJdbcTemplate createNamedJDBCTemplate(DataSource dataSource) {
		return new NamedParameterJdbcTemplate(dataSource);
	}

//	public static void main(String[] args) throws IOException {
//		File baseDirectory = new File("F:\\lustral_images\\lustral\\colectii");
//		for (File folder : baseDirectory.listFiles()) {
//			if (folder.isDirectory()) {
//				File jpg = new File(folder.getAbsolutePath() + "/a.jpg");
//				System.out.println(jpg.exists());
//				File newFile = new File(folder.getAbsolutePath() + "/main.jpg");
//				Files.copy(new FileInputStream(jpg), Paths.get(newFile.getAbsolutePath()));
//			}
//		}
//	}


}
